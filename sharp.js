const fs = require("fs");
const glob = require("glob");
const path = require("path");
const sharp = require("sharp");

// Define all of the resizes that will be done to these images.
// `src` is the source of these files, a glob pattern
// `dist` is the folder to which the output builds
// `percent` is the percentage that the width will be multiplied by

const resizes = [
	{
		src: "./_includes/assets/images/*.{png,jpg,jpeg}",
		dist: "./_site/assets/images/desktop",
		percent: 100,
	},
	{
		src: "./_includes/assets/images/*.{png,jpg,jpeg}",
		dist: "./_site/assets/images/tablet",
		percent: 60,
	},
	{
		src: "./_includes/assets/images/*.{png,jpg,jpeg}",
		dist: "./_site/assets/images/mobile",
		percent: 40,
	},
];

// The formats to convert to, here this is converting all of these PNG files to the famed WebP format.

const formats = [
	{
		src: "./_includes/assets/images/*.{png,jpg,jpeg}",
		dist: "./_site/assets/images/fallback",
		format: "jpg",
	},
];

// Runnn the resizes!

resizes.forEach((resize) => {
	// Create the `dist` folder if it doesn't exist already

	if (!fs.existsSync(resize.dist)) {
		fs.mkdirSync(resize.dist, { recursive: true }, (err) => {
			if (err) throw err;
		});
	}

	// Get all of the files that match the glob pattern in `src`

	let files = glob.sync(resize.src);

	files.forEach((file) => {
		// Get the filename, will be used later
		let filename = path.basename(file);
		filename = filename.split(".").slice(0, -1).join(".");
		filename += `.webp`;

		// Construct the Sharp object
		const image = sharp(file);

		// Retrieve the metadata via Sharp
		image
			.metadata()
			.then((metadata) => {
				// Resize the image to a width specified by the `percent` value and output as PNG
				return image
					.resize(Math.round(metadata.width * (resize.percent / 100)))
					.toFormat("webp")
					.webp({ force: true })
					.toFile(`${resize.dist}/${filename}`)
					.catch((err) => {
						console.log(err);
					});
			})
			.then(() => {
				console.info("Processed image:", filename);
			})
			.catch((err) => {
				console.log(err);
			});
	});
});

// Runnn the format converts

formats.forEach((format) => {
	// Create the `dist` folder if it doesn't exist already

	if (!fs.existsSync(format.dist)) {
		fs.mkdirSync(format.dist, { recursive: true }, (err) => {
			if (err) throw err;
		});
	}

	// Find all files matching the glob patterns specified in `src`
	let files = glob.sync(format.src);

	files.forEach((file) => {
		let filename = path.basename(file);
		const image = sharp(file);
		// Convert to WebP via Sharp's inferencing automatically of extensions
		image.toFile(`${format.dist}/${filename.replace("png", format.format)}`).catch((err) => {
			console.log(err);
		});
	});
});
