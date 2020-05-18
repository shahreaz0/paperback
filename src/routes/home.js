//modules
const express = require("express");
//models
const Book = require("./../models/Book");
//express config
const router = express.Router();

// GET /
router.get("/", async (req, res) => {
	try {
		const recentBooks = await Book.find()
			.sort({ publishDate: "desc" })
			.limit(10)
			.exec();
		res.render("home", {
			pageTitle: "Paperback",
			books: recentBooks,
			path: req.path,
		});
	} catch (error) {
		res.render("error", {
			pageTitle: "Error",
			backButton: "/",
		});
	}
});

module.exports = router;
