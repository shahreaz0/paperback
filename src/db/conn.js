// if (process.env.NODE_ENV !== "production") {
// }
require("dotenv").config();
const mongoose = require("mongoose");
mongoose
	.connect(process.env.DB_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.catch((err) => console.log(err));

const db = mongoose.connection;

db.on("error", (err) => console.log(err));
db.once("open", () => console.log("Connected to mongoose!!"));
