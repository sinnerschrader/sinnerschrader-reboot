module.exports = {
	entry: "./_includes/js/main.js",
	target: "web",
	output: {
		path: `${__dirname}/_site`,
		filename: "bundle.js",
	},
	mode: "development",
	watch: true,
};
