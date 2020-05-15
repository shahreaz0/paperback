//modules
const path = require("path");
const express = require("express");
const methodOverride = require("method-override");
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
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));
app.use(express.static(path.join("public")));
app.use(methodOverride("_method"));
//routes config
app.use(homeRoutes);
app.use(authorRoutes);
app.use(bookRoutes);

//exports
module.exports = app;
