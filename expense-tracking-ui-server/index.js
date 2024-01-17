require('dotenv').config();
const express = require('express');
const https = require("https");
var http = require('http');
const fs = require('fs');
const app = express();
const backendEndpoint = process.env.BACKEND_ENPOINT

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.get('/', async function (req, res) {
	res.render('../../expense-tracking-ui', { VAPID_PUBLIC_KEY: process.env.VAPID_PUBLIC_KEY, BACKEND_ENPOINT: backendEndpoint, CATEGORIES: await getCategories() });
});
app.use(express.static('../expense-tracking-ui'));

// Read SSL certificate and key files
const sslOptions = {
	key: fs.readFileSync(process.env.KEY_FILE_PATH),
	cert: fs.readFileSync(process.env.CERTIFICATE_FILE_PATH)
};
var serverHTTPS = https.createServer(sslOptions, app);
const httpsPort = process.env.HTTPS_PORT || 4000;
serverHTTPS.listen(httpsPort, () => {
	console.log(`App listening on https://localhost:${httpsPort}`);
});

var serverHTTP = http.createServer(app);
const httpPort = process.env.HTTP_PORT || 4001;
serverHTTP.listen(httpPort, () => {
	console.log(`App listening on http://localhost:${httpPort}`);
});


async function getCategories() {
	const response = await fetch(`${backendEndpoint}/categories/`, {
		method: 'get',
	});

	return await response.json();
}
