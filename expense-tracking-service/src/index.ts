import 'dotenv/config';
import { insert, readCategories, readExpenses } from './google-sheets';
import { auth, sheets } from '@googleapis/sheets';
import {
	storeSubscription,
	getAllSubscriptions
} from './subscription-repository';
import { setVapid, notify } from './web-notifications';
import express, { Request, Response } from 'express';
import cors from 'cors';
import https from 'https';
import http from 'http';
import fs from 'fs';

const corsOptions = {
	credentials: true
};
const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.put('/expenses', addExpense);
app.get('/expenses', getExpenses);
app.get('/categories', getCategories);
app.post('/subscriptions', addSubscription);

// Read SSL certificate and key files
const sslOptions = {
	key: fs.readFileSync(process.env.keyFilePath ?? ''),
	cert: fs.readFileSync(process.env.certificateFilePath ?? '')
};
var serverHTTPS = https.createServer(sslOptions, app);
const httpsPort = process.env.httpsPort || 8080;
serverHTTPS.listen(httpsPort, () => {
	console.log(`App listening on https://localhost:${httpsPort}`);
});

var serverHTTP = http.createServer(app);
const httpPort = process.env.httpPort || 8081;
serverHTTP.listen(httpPort, () => {
	console.log(`App listening on http://localhost:${httpPort}`);
});

const googleAuth = new auth.GoogleAuth({
	keyFile: process.env.credentialsFile,
	scopes: 'https://www.googleapis.com/auth/spreadsheets'
});

setVapid(
	process.env.vapidSubject ?? '',
	process.env.vapidPublicKey ?? '',
	process.env.vapidPrivateKey ?? ''
);

async function addExpense(req: Request, res: Response) {
	try {
		const body = req.body;

		const response = await insert(
			sheets({ version: 'v4', auth: googleAuth }),
			process.env.spreadsheetId ?? '',
			body.date,
			body.cost,
			body.category,
			body.description
		);

		await notify(
			getAllSubscriptions(),
			`${body.cost} for ${body.category} (${body.description})`
		);

		return res.status(200).send(response);
	} catch (error) {
		console.error(error);

		return res.status(999).send('Unknown error');
	}
}

async function getCategories(req: Request, res: Response) {
	try {
		const response = await readCategories(
			sheets({ version: 'v4', auth: googleAuth }),
			process.env.spreadsheetId ?? ''
		);

		return res.status(200).send(response);
	} catch (error) {
		console.error(error);

		return res.status(999).send('Unknown error');
	}
}

async function getExpenses(req: Request, res: Response) {
	try {
		const response = await readExpenses(
			sheets({ version: 'v4', auth: googleAuth }),
			process.env.spreadsheetId ?? ''
		);

		return res.status(200).send(response);
	} catch (error) {
		console.error(error);

		return res.status(999).send('Unknown error');
	}
}

async function addSubscription(req: Request, res: Response) {
	try {
		const body = req.body;

		const response = await storeSubscription(body);

		return res.status(200).send(response);
	} catch (error) {
		console.error(error);

		return res.status(999).send('Unknown error');
	}
}
