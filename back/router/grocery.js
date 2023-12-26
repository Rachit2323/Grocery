const express = require("express");
const app = express.Router();
const Grocery=require("../controllers/grocery.js");


app.post("/create", Grocery.createGrocery);
app.get("/allgrocery",Grocery.getAllGroceries);


module.exports = app;