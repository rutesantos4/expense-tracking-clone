require('dotenv').config();
const express = require('express');
const app = express();

const vapidPublicKey = process.env.VAPID_PUBLIC_KEY;
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.get('/', function (req, res) {
	res.render('../../expense-tracking-ui', { VAPID_PUBLIC_KEY: vapidPublicKey });
});
app.use(express.static('../expense-tracking-ui'));
app.listen(4000);