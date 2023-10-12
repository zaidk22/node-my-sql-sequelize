const express =require('express');
const bodyParser = require('body-parser');

const app = express();

const postRoute = require('./routes/posts');
const authRoute = require('./routes/auth');

app.use(bodyParser.json());
app.use('/',postRoute);
app.use('/auth',authRoute);

module.exports = app;