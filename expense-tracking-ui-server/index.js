require('dotenv').config();
const express = require('express');
const app = express();
const backendEndpoint = process.env.BACKEND_ENPOINT

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.get('/', async function (req, res) {
	res.render('../../expense-tracking-ui', { VAPID_PUBLIC_KEY: process.env.VAPID_PUBLIC_KEY, BACKEND_ENPOINT: backendEndpoint, CATEGORIES: await getCategories() });
});
app.use(express.static('../expense-tracking-ui'));
app.listen(4000);


async function getCategories() {
	const response = await fetch(`${backendEndpoint}/categories/`, {
		method: 'get',
	});

	return await response.json();
}
