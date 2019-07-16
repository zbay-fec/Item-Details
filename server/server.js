const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const {Item} = require('../database/index.js');
const mongoose = require("mongoose");
const cors = require('cors');
require('dotenv').config();

mongoose.connect(`mongodb+srv://${process.env.username}:${process.env.password}@zbay-tvguq.mongodb.net/Zbay?retryWrites=true&w=majority`, {useNewUrlParser: true});

const port = process.env.PORT || 3002;
const host = process.env.HOST || '0.0.0.0';

app.use(express.static("dist"));
app.use(
  bodyParser.json({
    strict: false
  })
);
app.use(cors());

app.get("http://ec2-52-15-148-19.us-east-2.compute.amazonaws.com:3002/item/:id", (req, res, next) => {
  Item.findOne({ID : req.params.id})
    .exec()
    .then(doc => {
      res.send(doc);
    })
    .catch(err => {
      console.log(err);
      res.send(500);
    });
});

app.listen(port, host, () => {
  console.log(`The shenanigans have started on aisle ${port}`);
});
