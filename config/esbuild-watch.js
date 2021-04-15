const chokidar = require("chokidar");
const esbuild = require("esbuild");
const { glsl } = require("esbuild-plugin-glsl");

chokidar.watch(["src/_includes/js/*.js", "src/_includes/glsl/*.{glsl,frag,vert}"]).on("all", async () => {
	try {
		await esbuild.build({
			entryPoints: ["src/_includes/js/main.js"],
			bundle: true,
			minify: false,
			outfile: "_site/bundle.js",
			plugins: [glsl({ minify: true })],
		});
	} catch (_ex) {}
});
