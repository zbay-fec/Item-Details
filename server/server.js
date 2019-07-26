require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const cors = require('cors');
var compression = require('compression');
const Product = require('../database/index');

// app.use(express.static("dist"));
app.use(
  bodyParser.json({
    strict: false
  })
);
app.use(cors());
// app.use(compression());

app.get("/item/:id", (req, res, next) => {
  const id = Number(req.params.id)
  return Product(id)
    .then(data => {
      if (data === 'not an id') {
        res.status(404).send({message: 'Can\'t find that, sorry.'})
      }
      res.send(data);
    })
    .catch(err => {
      console.log(err);
      res.send(500);
    });
});

module.exports = app;
