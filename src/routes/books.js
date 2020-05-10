const router = require("express").Router();
const multer = require("multer");
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

router.get("/books", (req, res) => {
	// const book1 = new Book({
	// 	title: "Title Something",
	// 	description: "Nothing",
	// 	publishDate: "2020-05-01",
	// 	bookCoverName: "image1",
	// });

	// book1
	// 	.save()
	// 	.then((book) => console.log(book))
	// 	.catch((err) => console.log(err));
	res.render("books/index", {
		pageTitle: "Books",
	});
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
			bookCoverName: req.file.filename,
		});
		await book.save();
		res.send(book);
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
