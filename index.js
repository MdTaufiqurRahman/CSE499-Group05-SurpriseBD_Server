const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

const app = express();

app.use(bodyParser.json());
app.use(cors());

const port =5000;

app.get('/', (req, res) =>{
    res.send("Hello Form SurpriseBD Server Side !");
})

app.listen(process.env.PORT || port);