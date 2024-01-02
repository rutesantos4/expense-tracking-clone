import { setVapidDetails, sendNotification, PushSubscription } from 'web-push';

export function setVapid(
	subject: string,
	publicKey: string,
	privateKey: string
) {
	setVapidDetails(subject, publicKey, privateKey);
}

export async function notify(
	subsctiptions: Array<PushSubscription>,
	payload: string
) {
	await Promise.all(
		subsctiptions.map(async (sub) => {
			try {
				await sendNotification(sub, payload);
			} catch (err) {
				console.log(sub.endpoint, '->', err.message);
			}
		})
	);
}
