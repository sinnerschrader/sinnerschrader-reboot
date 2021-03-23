// Based on https://dev.to/mathieuhuot/processing-sass-with-11ty-5a09
const { dirname, join } = require("path");
const { writeFile, watch, utimes } = require("fs-extra");
const fibers = require("fibers");
const sass = require("sass");

const renderSassAndSave = (src, dest) => {
	return new Promise((resolve, reject) => {
		sass.render(
			{
				file: src,
				fiber: fibers,
			},
			(error, result) => {
				if (error) {
					reject(error);
				}
				resolve(result);
				console.log(`Writing ${dest} from ${result.stats.entry} in ${result.stats.duration}ms.`);
			}
		);
	})
		.then((result) => writeFile(dest, result.css.toString()))
		.then((_) => {
			const time = new Date();
			return utimes(join(process.cwd(), "src/pages/stylesheet.njk"), time, time);
		})
		.catch(console.error);
};

module.exports = (scssPath, cssPath) => {
	renderSassAndSave(scssPath, cssPath);

	if (process.argv.includes("--serve")) {
		watch(dirname(scssPath), () => renderSassAndSave(scssPath, cssPath));
	}
};
