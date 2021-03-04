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
		const watcher = chokidar.watch("styles/{includes,core}/*.scss", {
			ignored: /(^|[\/\\])\../,
			persistent: true,
		});
		watcher.on("add", touchFile).on("change", touchFile);
	}
	processSassFiles("./styles/index.scss", "./_includes/css/main.css");

	eleventyConfig.setTemplateFormats(["liquid", "njk"]);

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
		"./_includes/assets/fonts": "./assets/fonts",
		"./_includes/assets/videos": "./assets/videos",
		"./_includes/assets/svg": "./assets/svg",
		"./_includes/assets/meta-assets": "./assets/meta-assets",
		"./_includes/data/*": "./data/",
	});

	return {
		dir: {
			data: "./_includes/data/",
			layouts: "_includes/layouts",
		},
	};
};

function touchFile() {
	const time = new Date();
	utimes(join(process.cwd(), "styles/index.scss"), time, time);
}
