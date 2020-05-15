const mongoose = require("mongoose");

//Schemas
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
		coverImage: {
			type: Buffer,
			// required: true,
		},
		coverImageType: {
			type: String,
			// required: true,
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
	if (book.coverImage && book.coverImageType) {
		return `data:${book.coverImageType};base64,${book.coverImage.toString(
			"base64",
		)}`;
	}
});

module.exports = mongoose.model("Book", bookSchema);
