import 'dotenv/config';
import { insert } from './google-sheets';
import { auth, sheets } from '@googleapis/sheets';

const googleAuth = new auth.GoogleAuth({
	keyFile: process.env.credentialsFile,
	scopes: 'https://www.googleapis.com/auth/spreadsheets'
});

insert(
	sheets({ version: 'v4', auth: googleAuth }),
	process.env.spreadsheetId ?? '',
	'2023-12-11',
	'cost',
	'category-1',
	'description-1'
);
