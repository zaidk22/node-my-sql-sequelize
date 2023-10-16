const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();


const postRoute = require('./routes/posts');
const authRoute = require('./routes/auth');


//app.use(bodyParser.json());

app.use(bodyParser.json());
const jsonFilePath = 'C:\\test1.json';
//const jsonFilePath = './controllers/test.json';
app.get('/api/data', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const itemsPerPage = parseInt(req.query.itemsPerPage) || 10;


  fs.readFile(jsonFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading JSON file: ${err}`);
      return res.status(500).send('Error reading JSON file');
    }


    try {
      const jsonData = JSON.parse(data);

        jsonData.reverse();
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const totalCount = jsonData.length;

      const pageData = jsonData.slice(startIndex, endIndex);
      res.setHeader('X-Total-Count', totalCount);
      res.json({ data: pageData, totalCount: totalCount }); 
    } catch (error) {
      console.error(`Error parsing JSON: ${error}`);
      res.status(500).send('Error parsing JSON');
    }
  });
});

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
app.use('/', postRoute);
app.use('/auth', authRoute);

module.exports = app;