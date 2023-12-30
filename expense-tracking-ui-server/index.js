const express = require('express')
const app = express()
app.use(express.static('../expense-tracking-ui'))
app.listen(4000)