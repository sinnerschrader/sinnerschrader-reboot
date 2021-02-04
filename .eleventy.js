const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const { default: postcss } = require("postcss");
const processSassFiles = require("./config/process-sass");

module.exports = (eleventyConfig) => {
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
};
