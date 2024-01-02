import 'dotenv/config';
import { insert } from './google-sheets';
import { auth, sheets } from '@googleapis/sheets';
import { setVapid } from './web-notifications';
import express, { Request, Response } from 'express';
import cors from 'cors';

const corsOptions = {
    credentials: true
};
const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.put('/expenses', addExpense);
app.post('/subscriptions', addSubscription);

const port = process.env.PORT;
app.listen(port !== undefined ? port : 8080);

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
