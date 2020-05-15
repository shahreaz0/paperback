const router = require("express").Router();
const Author = require("./../models/Author");

// GET /author
router.get("/authors", async (req, res) => {
	try {
		let searchOption = {};
		if (req.query.authorName) {
			const key = new RegExp(req.query.authorName, "i");
			searchOption.name = key;
		}
		const authors = await Author.find(searchOption);

		res.render("authors/index", {
			pageTitle: "Authors",
			authors,
			query: req.query.authorName,
		});
	} catch (error) {
		res.render("error", { error });
	}
});

// GET /author/new
router.get("/authors/new", (req, res) => {
	res.render("authors/new", {
		pageTitle: "Add Author",
	});
});

// POET /author
router.post("/authors", async (req, res) => {
	try {
		if (!req.body.authorName) throw "Enter author name.";
		const author = new Author({ name: req.body.authorName });
		await author.save();
		res.redirect("/authors");
	} catch (error) {
		res.render("error", {
			pageTitle: "Error",
			error,
			backButton: "/authors/new",
		});
	}
});

module.exports = router;
