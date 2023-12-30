import 'dotenv/config';
import { PushSubscription } from 'web-push';
import { writeFile, readFileSync } from 'fs';

const filePath = process.env.subscriptionsFile ?? '';

export async function storeSubscription(subscription: PushSubscription) {
	const subscriptions: Array<PushSubscription> = getAllSubscriptions();
	subscriptions.push(subscription);

	const subscriptionsJson = JSON.stringify(subscriptions);

	writeFile(filePath, subscriptionsJson, (err) => {
		if (err) {
			console.log('Error writing file:', err);
		} else {
			console.log('Successfully wrote file');
		}
	});
}

export function getAllSubscriptions(): Array<PushSubscription> {
	const data: string = readFileSync(filePath, 'utf8');
	let allSubscriptions: PushSubscription[] = [];

	if (data) {
		allSubscriptions = JSON.parse(data ?? '') || [];
	}

	return allSubscriptions;
}
