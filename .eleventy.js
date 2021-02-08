const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const chokidar = require("chokidar");
const { utimes } = require("fs-extra");
const htmlmin = require("html-minifier");
const { join } = require("path");
const { default: postcss } = require("postcss");

const processSassFiles = require("./config/process-sass");

module.exports = eleventyConfig => {
	const watcher = chokidar.watch("styles/{includes,core}/*.scss", {
		ignored: /(^|[\/\\])\../,
		persistent: true
	});
	watcher.on("add", touchFile).on("change", touchFile);
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
		files: "./_site/stylesheet.css"
	});

	eleventyConfig.addWatchTarget("_site/index.css");
	eleventyConfig.setBrowserSyncConfig({ files: ["_site/index.css"] });

	eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
		if (outputPath.endsWith(".html")) {
			let minified = htmlmin.minify(content, {
				useShortDoctype: true,
				removeComments: true,
				collapseWhitespace: true
			});
			return minified;
		}

		return content;
	});
};

function touchFile() {
	const time = new Date();
	utimes(join(process.cwd(), "styles/index.scss"), time, time);
}
