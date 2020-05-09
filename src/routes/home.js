//modules
const express = require("express");

//express config
const router = express.Router();

// GET /
router.get("/", function (req, res, next) {
	res.render("home", { pageTitle: "Paperback" });
});

module.exports = router;
