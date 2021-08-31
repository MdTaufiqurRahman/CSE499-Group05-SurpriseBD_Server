const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const { MongoClient } = require("mongodb");

//Here we connected our database 

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.oipru.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = 5000;

app.get("/", (req, res) => {
  res.send("Hello from DB it's working");
});

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err) => {
  const productsCollection = client.db("surprisebd").collection("products");
  const ordersCollection = client.db("surprisebd").collection("orders");
  const appointmentCollection = client
    .db("surprisebd")
    .collection("appointments");

  //insert all products data

  app.post("/addProduct", (req, res) => {
    const products = req.body;
    productsCollection.insertOne(products).then((result) => {
      console.log(result.insertedCount);
      res.send(result.insertedCount);
    });
  });

  //get products data from database
  app.get("/products", (req, res) => {
    let search = req.query.search;
    productsCollection
      .find({ name: { $regex: search } })
      .toArray((err, documents) => {
        res.send(documents);
      });
  });

  //get product data from database
  app.get("/product/:key", (req, res) => {
    productsCollection
      .find({ key: req.params.key })
      .toArray((err, documents) => {
        res.send(documents[0]);
      });
  });

  //get products data from database


  app.post("/productsByKeys", (req, res) => {
    const productKeys = req.body;
    productsCollection
      .find({ key: { $in: productKeys } })
      .toArray((err, documents) => {
        res.send(documents);
      });
  });

  app.post("/addOrder", (req, res) => {
    const order = req.body;
    ordersCollection.insertOne(order).then((result) => {
      res.send(result.insertedCount > 0);
    });
  });

  app.post("/addAppointment", (req, res) => {
    const appointment = req.body;
    appointmentCollection.insertOne(appointment).then((result) => {
      res.send(result.insertedCount > 0);
    });
  });

  app.post("/appointmentsByDate", (req, res) => {
    const date = req.body;
    console.log(date.date);
    appointmentCollection
      .find({ date: date.date })
      .toArray((err, documents) => {
        console.log(err);
        res.send(documents);
      });
  });

  //end bracket
});

app.listen(process.env.PORT || port);
