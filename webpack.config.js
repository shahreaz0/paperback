const path = require("path");
const nodeExternals = require("webpack-node-externals");

const frontConfig = {
	//bundle-front.js
};
const backConfig = {
	target: "node",
	entry: {
		app: ["./src/bin/www"],
	},
	output: {
		path: path.resolve(__dirname, "./build"),
		filename: "bundle-back.js",
	},
	node: {
		__dirname: true,
	},
	externals: [nodeExternals()],
};

// Combined 'module.exports'
module.exports = [backConfig];
