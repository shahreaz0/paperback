const router = require("express").Router();
const Book = require("./../models/Book");
const Author = require("./../models/Author");

// Shows all books
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
			path: req.path,
			searchOptions: req.query,
			books,
		});
	} catch (error) {
		res.render("error", { backButton: "/books", error });
	}
});

// Create new book form
router.get("/books/new", async (req, res) => {
	const authors = await Author.find({});
	res.render("books/new", {
		pageTitle: "Add Book",
		path: req.path,
		authors,
	});
});

// Create new book
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
		fileUpload(book, req.body.cover);

		await book.save();
		res.redirect("/books");
	} catch (error) {
		res.render("error", {
			pageTitle: "Error",
			error,
			backButton: "/books/new",
		});
	}
});

// Show Book by id
router.get("/books/:id", async (req, res) => {
	try {
		const book = await (
			await Book.findById(req.params.id).populate("author")
		).execPopulate();
		res.render("books/show", {
			pageTitle: book.title,
			book,
		});
	} catch (error) {
		res.render("error", { backButton: "/books", error });
	}
});

// Edit Book form
router.get("/books/:id/new", async (req, res) => {
	try {
		const book = await Book.findById(req.params.id);
		const authors = await Author.find({});
		res.render("books/edit", {
			pageTitle: `Edit ${book.title}`,
			book,
			authors,
		});
	} catch (error) {
		res.render("error", { backButton: "/books", error });
	}
});

// Edit Book by id
router.put("/books/:id", async (req, res) => {
	try {
		const book = await Book.findById(req.params.id);
		book.title = req.body.bookTitle || book.title;
		book.description = req.body.bookDescription || book.description;
		if (req.body.bookPublishDate)
			book.publishDate = new Date(req.body.bookPublishDate);
		book.author = req.body.bookAuthor || book.author;
		fileUpload(book, req.body.cover);

		await book.save();

		res.redirect(`/books/${req.params.id}`);
	} catch (error) {
		res.render("error", {
			pageTitle: "Error",
			error,
			backButton: `/books/${req.params.id}/new`,
		});
	}
});

// Delete Book by id
router.delete("/books/:id", async (req, res) => {
	try {
		const book = await Book.findById(req.params.id);
		await book.remove();
		res.redirect("/books");
	} catch (error) {
		res.render("error", {
			pageTitle: "Error",
			error,
			backButton: `/books/${req.params.id}`,
		});
	}
});

//Functions

const fileUpload = (book, cover) => {
	if (book && cover) {
		const coverData = JSON.parse(cover);
		const mimeTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
		if (coverData && mimeTypes.includes(coverData.type)) {
			book.coverImage = new Buffer.from(coverData.data, "base64");
			book.coverImageType = coverData.type;
		}
	} else {
		return new Error("Something wrong with file upload.Try again.");
	}
};

module.exports = router;
