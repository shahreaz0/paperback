//modules
const path = require("path");
const express = require("express");
//db connection
require("./db/conn");
//routes
const homeRoutes = require("./routes/home");
const authorRoutes = require("./routes/authors");
const bookRoutes = require("./routes/books");

//express config
const app = express();
//set
app.set("views", path.join("views"));
app.set("view engine", "ejs");
//use
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join("public")));
//routes config
app.use(homeRoutes);
app.use(authorRoutes);
app.use(bookRoutes);

//exports
module.exports = app;
