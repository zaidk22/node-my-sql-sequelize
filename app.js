const express =require('express');
const bodyParser = require('body-parser');

const app = express();

const postRoute = require('./routes/posts');
const authRoute = require('./routes/auth');



//app.use(bodyParser.json());

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorizaton');
    next();
  });
app.use((error, req, res, next) => {                        // customize error
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data, statusCode: status });
  
  });
app.use('/',postRoute);
app.use('/auth',authRoute);

module.exports = app;