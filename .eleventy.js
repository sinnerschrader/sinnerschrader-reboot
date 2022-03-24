const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const chokidar = require("chokidar");
const { utimes } = require("fs-extra");
const htmlmin = require("html-minifier");
const { join } = require("path");
const { default: postcss } = require("postcss");

const processSassFiles = require("./config/process-sass");

module.exports = (eleventyConfig) => {
	if (process.argv.includes("--serve")) {
		const watcher = chokidar.watch("./src/styles/{includes,core}/*.scss", {
			ignored: /(^|[\/\\])\../,
			persistent: true,
		});
		watcher.on("add", touchFile).on("change", touchFile);
	}
	processSassFiles("./src/styles/index.scss", "./src/_includes/css/main.css");

	eleventyConfig.setLiquidOptions({
		dynamicPartials: false,
		strictFilters: false,
	});

	eleventyConfig.setTemplateFormats(["liquid", "njk"]);
	eleventyConfig.setTemplateFormats(["md", "liquid", "njk"]);

	eleventyConfig.addLiquidFilter("groupByDiscipline", function (items, discipline) {
		return items.filter((it) => it.data.discipline && it.data.discipline.toLowerCase() === discipline.toLowerCase());
	});

	eleventyConfig.addTransform("async-transform-name", async (content, outputPath) => {
		if (outputPath.endsWith(".css")) {
			const postCSSResult = await postcss([autoprefixer, cssnano]).process(content, { from: outputPath, to: outputPath });
			return postCSSResult.css;
		}
		return content;
	});

	eleventyConfig.setBrowserSyncConfig({
		files: "./_site/stylesheet.css",
	});

	eleventyConfig.addWatchTarget("_site/index.css");
	eleventyConfig.addWatchTarget("_site/bundle.js");
	eleventyConfig.setBrowserSyncConfig({ files: ["_site/index.css", "_site/bundle.js"] });

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
	});

	return {
		dir: {
			input: "./src",
			layouts: "_layouts",
		},
	};
};

function touchFile() {
	const time = new Date();
	utimes(join(process.cwd(), "./src/styles/index.scss"), time, time);
}
