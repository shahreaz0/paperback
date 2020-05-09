const router = require("express").Router();
const Author = require("./../models/Author");

// GET /author
router.get("/author", async (req, res) => {
	try {
		let searchOption = {};
		if (req.query.authorName) {
			const key = new RegExp(req.query.authorName, "i");
			searchOption.name = key;
		}
		const authors = await Author.find(searchOption);

		res.render("author/index", {
			pageTitle: "Authors",
			authors,
		});
	} catch (error) {
		res.render("error", { error });
	}
});

// GET /author/new
router.get("/author/new", (req, res) => {
	res.render("author/new", {
		pageTitle: "Add Author",
	});
});

// POET /author
router.post("/author", async (req, res) => {
	try {
		const author = new Author({ name: req.body.authorName });
		await author.save();
		res.redirect("/author");
	} catch (error) {
		res.render("error", { error });
	}
});

module.exports = router;
