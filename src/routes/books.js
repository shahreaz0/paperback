const router = require("express").Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const Book = require("./../models/Book");
const Author = require("./../models/Author");

const upload = multer({
	dest: "public/uploads/cover",
	limits: {
		fileSize: 1000000,
	},
	fileFilter(req, file, cb) {
		if (!file.originalname.match(/\.(jpeg|jpg|png)$/i)) {
			cb(new Error("Only image are allowed"));
		}
		cb(null, true);
	},
});

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

router.get("/books/new", async (req, res) => {
	const authors = await Author.find({});
	res.render("books/new", {
		pageTitle: "Add Book",
		authors,
	});
});

router.post("/books", upload.single("cover"), async (req, res) => {
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
		if (!req.file) throw "Select file";

		const book = new Book({
			title: req.body.bookTitle,
			description: req.body.bookDescription,
			publishDate: req.body.bookPublishDate,
			author: req.body.bookAuthor,
			coverName: req.file.filename,
		});
		await book.save();
		res.redirect("/books");
	} catch (error) {
		fs.unlink(
			path.join("public", "uploads", "cover", req.file.filename),
			(err) => console.log(err),
		);
		res.render("error", {
			pageTitle: "Error",
			error,
			backButton: "/books/new",
		});
	}
	//res.redirect("/books");
});

module.exports = router;
