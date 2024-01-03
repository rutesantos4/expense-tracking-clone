import 'dotenv/config';
import { PushSubscription } from 'web-push';
import { writeFile, existsSync, readFileSync, writeFileSync } from 'fs';

const filePath = process.env.subscriptionsFile ?? '';

export async function storeSubscription(subscription: PushSubscription) {
	const subscriptions: Array<PushSubscription> = getAllSubscriptions();

	console.log(subscriptionExists(subscription, subscriptions));
	if (subscriptionExists(subscription, subscriptions)) {
		console.log('Subscription is already stored');
		return;
	}

	subscriptions.push(subscription);

	const subscriptionsJson = JSON.stringify(subscriptions);

	writeFile(filePath, subscriptionsJson, (err) => {
		if (err) {
			console.log('Error storing Subscription:', err);
		} else {
			console.log('Successfully store Subscription');
		}
	});
}

export function getAllSubscriptions(): Array<PushSubscription> {
	let allSubscriptions: PushSubscription[] = [];

	if (!existsSync(filePath)) {
		console.log('create file');
		writeFileSync(filePath, JSON.stringify([]));
		return allSubscriptions;
	}

	const data: string = readFileSync(filePath, 'utf8');

	if (data) {
		allSubscriptions = JSON.parse(data ?? '') || [];
	}

	return allSubscriptions;
}

function subscriptionExists(
	subscription: PushSubscription,
	subscriptions: Array<PushSubscription>
): boolean {
	var contains = subscriptions.some((element) => {
		return JSON.stringify(element) === JSON.stringify(subscription);
	});
	return contains;
}
