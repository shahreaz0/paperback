const router = require("express").Router();
const Book = require("./../models/Book");
const Author = require("./../models/Author");

// GET /books ------------------------------------------------------->
router.get("/books", async (req, res) => {
	try {
		let query = Book.find();
		//const books = await Book.find({});
		if (req.query.title) {
			query = query
				.where("title")
				.regex(new RegExp(req.query.title, "i"));
		}
		if (req.query.publishAfter) {
			query = query.where("publishDate").gte(req.query.publishAfter);
		}
		if (req.query.publishBefore) {
			query = query.where("publishDate").lte(req.query.publishBefore);
		}
		const books = await query.exec();
		res.render("books/index", {
			pageTitle: "Books",
			searchOptions: req.query,
			books,
		});
	} catch (error) {
		res.render("error", { backButton: "/books", error });
	}
});

// GET /books/new ------------------------------------------------->
router.get("/books/new", async (req, res) => {
	const authors = await Author.find({});
	res.render("books/new", {
		pageTitle: "Add Book",
		authors,
	});
});

//POST /books ----------------------------------------------------->
router.post("/books", async (req, res) => {
	const inputs = [
		"bookTitle",
		"bookDescription",
		"bookPublishDate",
		"bookAuthor",
	];

	try {
		inputs.forEach((e) => {
			if (!req.body[e]) throw `Enter ${e}`;
		});

		const book = new Book({
			title: req.body.bookTitle,
			description: req.body.bookDescription,
			publishDate: req.body.bookPublishDate,
			author: req.body.bookAuthor,
		});
		const coverData = JSON.parse(req.body.cover);
		const mimeTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
		if (coverData && mimeTypes.includes(coverData.type)) {
			book.coverImage = new Buffer(coverData.data, "base64");
			book.coverImageType = coverData.type;
		}

		await book.save();
		res.redirect("/books");
	} catch (error) {
		res.render("error", {
			pageTitle: "Error",
			error,
			backButton: "/books/new",
		});
	}
	//res.redirect("/books");
});

module.exports = router;
