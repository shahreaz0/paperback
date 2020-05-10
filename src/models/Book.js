const mongoose = require("mongoose");

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
		bookCoverName: {
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

module.exports = mongoose.model("Book", bookSchema);
