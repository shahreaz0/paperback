const router = require("express").Router();
const Author = require("./../models/Author");
const Book = require("./../models/Book");

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

// POST /author
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

// GET /authors/:id
router.get("/authors/:id", async (req, res) => {
	try {
		const author = await Author.findById(req.params.id);
		const books = await Book.find({ author: author._id });

		res.render("authors/show", {
			pageTitle: author.name,
			author,
			booksByAuthor: books,
		});
	} catch (error) {
		res.render("error", { error });
	}
});

// PUT /authors/:id
router.put("/authors/:id", async (req, res) => {
	try {
		const author = await Author.findById(req.params.id);
		author.name = req.body.authorName;
		await author.save();
		res.redirect(`/authors/${req.params.id}`);
	} catch (error) {
		res.render("error", { error });
	}
});

// GET /authors/:id/new
router.get("/authors/:id/edit", async (req, res) => {
	try {
		const author = await Author.findById(req.params.id);
		res.render("authors/edit", {
			pageTitle: `Edit ${author.name}`,
			author,
		});
	} catch (error) {
		res.render("error", { error });
	}
});

// DELETE /authors/:id
router.delete("/authors/:id", async (req, res) => {
	try {
		const author = await Author.findById(req.params.id);

		await author.remove();
		res.redirect("/authors");
	} catch (error) {
		res.render("error", { error, backButton: "/authors" });
	}
});

module.exports = router;
