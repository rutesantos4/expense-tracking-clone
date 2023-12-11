import { sheets_v4 } from '@googleapis/sheets';

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
							sheetId: 0, // Assuming the first sheet
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
							sheetId: 0, // Assuming the first sheet
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
