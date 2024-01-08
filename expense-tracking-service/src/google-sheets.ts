import { sheets_v4 } from '@googleapis/sheets';

const EXPENSES_SHEET_ID = 0;
const CATEGORIES_SHEET_NAME = "Categories";

export async function insert(
	googleSheets: sheets_v4.Sheets,
	spreadsheetId: string,
	date: string,
	cost: string,
	category: string,
	description: string
) {
	// Define the values you want to add as a new row
	const newRowValues = [date, cost, category, description];

	// Prepare the request to insert the new row at the 2nd position
	const request = {
		spreadsheetId,
		resource: {
			requests: [
				{
					insertDimension: {
						range: {
							sheetId: EXPENSES_SHEET_ID,
							dimension: 'ROWS',
							startIndex: 1, // Insert at the 2nd position
							endIndex: 2 // Insert one row
						},
						inheritFromBefore: false
					}
				},
				{
					pasteData: {
						coordinate: {
							sheetId: EXPENSES_SHEET_ID,
							rowIndex: 1, // The 2nd row
							columnIndex: 0 // Start from the first column
						},
						data: newRowValues.join('\t'),
						type: 'PASTE_NORMAL',
						delimiter: '\t' // Use tab as a delimiter
					}
				}
			]
		}
	};

	// Execute the batch update request
	try {
		const response = await googleSheets.spreadsheets.batchUpdate(request);
		console.log('New row added successfully.');
		return response;
	} catch (error) {
		console.error('Error adding new row:', error);
	}
}

export async function readCategories(
	googleSheets: sheets_v4.Sheets,
	spreadsheetId: string
): Promise<string[]> {
	// Prepare the request to read the first column
	const request = {
		spreadsheetId,
		range: `${CATEGORIES_SHEET_NAME}!A2:A1000`
	};

	// Execute the get request
	try {
		const response = await googleSheets.spreadsheets.values.get(request);
		const values = response.data.values;
		var result: string[] = values ? values.flat(Infinity).map(el => String(el)) : []
		console.log('Categories read successfully.', result);
		return result;
	} catch (error) {
		console.error('Error reading categories:', error);
		return [];
	}
}
