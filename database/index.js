const mongoose = require("mongoose");
require("dotenv").config();

const itemSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  ID: String,
  Name: String,
  Price: String,
  "Image 1": String,
  "Image 2": String,
  "Image 3": String,
  "Image 4": String,
  "Image 5": String,
  "Seller Name": String,
  "Seller Score": String,
  "Seller Feedback": String,
  Condition: String,
  Category: String
});

<<<<<<< HEAD
const Item = mongoose.model("Zbay", itemSchema, "zbay");
=======
const Item = mongoose.model('Zbay', itemSchema, "zbay");
>>>>>>> cc8fe94f3b454c86a1a2cd0ec4202e1e6350c25b

module.exports = { Item };
