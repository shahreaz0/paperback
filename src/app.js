//modules
const path = require("path");
const express = require("express");
//db connection
require("./db/conn");
//Router()
const homeRouter = require("./routes/home");
console.log(process.env.NODE_ENV);

//express config
const app = express();
//set
app.set("views", path.join(__dirname, "./../views"));
app.set("view engine", "ejs");
//use
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "./../public")));

//routes
app.use("/", homeRouter);

//exports
module.exports = app;
