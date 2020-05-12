const mongoose = require("mongoose");
const path = require("path");

const bookSchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		publishDate: {
			type: Date,
			required: true,
		},
		coverName: {
			type: String,
			required: true,
		},
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Author",
		},
	},
	{
		timestamps: true,
	},
);

bookSchema.virtual("imagePath").get(function () {
	book = this;
	if (book.coverName) {
		return path.join("uploads", "cover", book.coverName);
	}
});

module.exports = mongoose.model("Book", bookSchema);
