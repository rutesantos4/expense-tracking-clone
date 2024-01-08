require('dotenv').config();
const express = require('express');
const app = express();

const vapidPublicKey = process.env.VAPID_PUBLIC_KEY;
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.get('/', async function (req, res) {
	res.render('../../expense-tracking-ui', { VAPID_PUBLIC_KEY: vapidPublicKey, CATEGORIES: await getCategories() });
});
app.use(express.static('../expense-tracking-ui'));
app.listen(4000);

        
async function getCategories() {
	const response = await fetch('http://127.0.0.1:8080/categories/', {
		method: 'get',
	});

	return await response.json();
}