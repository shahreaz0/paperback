const mongoose = require("mongoose");
const Book = require("./Book");
const authorSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
});

authorSchema.pre("remove", function (next) {
	const author = this;
	Book.find({ author })
		.then((books) => {
			if (books.length) {
				next(new Error("This author has books"));
			} else {
				next();
			}
		})
		.catch((err) => next(err));
});

module.exports = mongoose.model("Author", authorSchema);
