const webPush = require("web-push");

const vapidKeys = {
	publicKey: "BEyo6NJbZAUZZY4fdXv7IeIogjDWdLjl2VI_I4ozH3vfp7Mt0jvVWwFI3QYNyiDeYZZWwbVPyiGho6fv8IpLM_0",
	privateKey: "ORmV-hQZ6ArRhG-UqIsx_ue6epDUjW6HWuZAnkEILIU",
};

webPush.setVapidDetails("mailto:example@yourdomain.org", vapidKeys.publicKey, vapidKeys.privateKey);
const pushSubscription = {
	endpoint:
		"https://fcm.googleapis.com/fcm/send/caUTdIFy1d4:APA91bF14b-3twd_fsH_FokXT4t00qvFeq3rIV4yhj5FkczhbdWnRRMbcbs-KXq2irc6iLCTPYyELwFaTeAehky-2G_pMOoLqP-aOq-YUaSndzWqnQ26Chexoy18N146PIXdRp1yzxW1",
	keys: {
		p256dh: "BBCXvHCHNB2HDU4HCjdGsIkem89W6GLaXrwGR3dA2YfPCMqM17fqGb+TpodnBsWqbuUNDT+69KqWQjDJCa3iLjDM=",
		auth: "GNQzDVaLe3JFc+L6NdqdLQ==",
	},
};
const payload = "Selamat! Anda sudah dapat menerima notifikasi update informasi terbaru dari EPL APP";

const options = {
	gcmAPIKey: "657960658562",
	TTL: 60,
};
webPush
	.sendNotification(pushSubscription, payload, options)
	.then(function (res) {
		console.log(res);
	})
	.catch(function (e) {
		console.log(e);
	});
