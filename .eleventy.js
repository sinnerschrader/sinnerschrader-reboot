const htmlmin = require("html-minifier");

module.exports = (eleventyConfig) => {
	eleventyConfig.setLiquidOptions({
		dynamicPartials: false,
		strictFilters: false,
	});

	eleventyConfig.setTemplateFormats(["md", "liquid"]);

	eleventyConfig.addLiquidFilter("groupByDiscipline", function (items, discipline) {
		return items.filter((it) => it.data.discipline.toLowerCase() === discipline.toLowerCase());
	});

	eleventyConfig.addWatchTarget("_site/styles.css");
	eleventyConfig.addWatchTarget("_site/bundle.js");
	eleventyConfig.setBrowserSyncConfig({ files: ["_site/styles.css", "_site/bundle.js"] });

	eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
		if (outputPath.endsWith(".html")) {
			let minified = htmlmin.minify(content, {
				useShortDoctype: true,
				removeComments: true,
				collapseWhitespace: true,
			});
			return minified;
		}

		return content;
	});

	eleventyConfig.addPassthroughCopy({
		"./src/_includes/assets/fonts": "./assets/fonts",
		"./src/_includes/assets/videos": "./assets/videos",
		"./src/_includes/assets/svg": "./assets/svg",
		"./src/_includes/assets/emojis": "./assets/emojis",
		"./src/_includes/assets/meta-assets": "./assets/meta-assets",
		"./src/_includes/data/*": "./data/",
		"./config/netlify-cms-config.yml": "./admin/config.yml",
		"./node_modules/netlify-cms/dist/netlify-cms.js": "./netlify-cms.js",
		"./src/_includes/js/jobs.js": "jobs.js",
	});

	return {
		dir: {
			input: "./src",
			layouts: "_layouts",
		},
	};
};
