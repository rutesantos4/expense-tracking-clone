import { setVapidDetails, sendNotification, PushSubscription } from 'web-push';

export function setVapid(
	subject: string,
	publicKey: string,
	privateKey: string
) {
	setVapidDetails(subject, publicKey, privateKey);
}

