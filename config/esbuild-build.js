const esbuild = require("esbuild");
const { glsl } = require("esbuild-plugin-glsl");
esbuild
	.build({
		entryPoints: ["src/_includes/js/main.js"],
		bundle: true,
		minify: true,
		outfile: "_site/bundle.js",
		plugins: [glsl({ minify: true })],
	})
	.catch(() => process.exit(1));
