const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();
const { MongoClient } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.oipru.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const app = express();

app.use(bodyParser.json());
app.use(cors());

const port = 5000;

// console.log(process.env.DB_USER);

// app.get("/", (req, res) => {
//   res.send("Hello Form SurpriseBD Server Side !");
// });

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const products = client.db("surprisebd").collection("products");

  app.post("/addProduct", (req, res) => {
    const product = req.body;
    console.log(product);
    products.insertOne(product).then((result) => {
      console.log(result);
    });
  });
});

app.listen(process.env.PORT || port);
