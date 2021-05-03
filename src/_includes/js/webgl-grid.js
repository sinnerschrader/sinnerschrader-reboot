import { Renderer, Mesh, createPlaneGeometry, createShaderMaterial, Stopwatch, Color, perspective, Camera } from "colorful-pixels";
import { mediaQuery } from "./media-query";
import vertexShader from "../glsl/grid-shader.vert";
import fragmentShader from "../glsl/grid-shader.frag";

export class WebGLGrid {
	region = document.querySelector(".job-teaser__wrapper");
	reduceMotion = mediaQuery("(prefers-reduced-motion: reduce)");
	camera = new Camera();
	clock = new Stopwatch();
	pointer = { x: NaN, y: NaN };

	constructor() {
		this.canvas = document.querySelector("canvas.webgl-canvas");
		const { canvas } = this;
		if (!canvas) {
			console.info("WebGLGrid plugin: no canvas found. Not invoking the magic");
			return;
		}
		if (!this.region) {
			console.info("WebGLGrid plugin: region not found. Not invoking the magic");
			return;
		}
		const renderer = new Renderer(canvas);
		if (!renderer.gl) {
			// no WebGL is supported, add a class to a body so we could provide a pure CSS fallback
			document.body.classList.add("no-webgl");
			return;
		}
		const plane = createPlaneGeometry(2, 2, 50, 50);

		const { camera } = this;
		camera.position.z = 20;
		camera.update();

		const material = createShaderMaterial(vertexShader, fragmentShader, {
			time: 0,
			dpr: this.getCurrentDPR(),
			resolution: [canvas.clientWidth, canvas.clientHeight],
			bg: Color.fromHex("#ffffff"),
			fg: Color.fromHex("#000000"),
			projectionMatrix: this.calculatePerspective(),
			gridBoundingRect: this.calculateGridBoundingRect(),
			viewMatrix: camera.viewMatrix,
			cellSize: 25,
			edge: 0.1,
			pointer: [-1000, -1000],
		});
		const mesh = new Mesh(plane, material);
		if (!this.reduceMotion.matches) {
			this.clock.start();
		}

		this.renderer = renderer;
		this.mesh = mesh;
		this.scene = [mesh];
		this.material = material;
		this.dpr = this.getCurrentDPR();
		this.onResize();
		this.reduceMotion.addEventListener("change", this.onChangeReduceMotion, false);
		window.addEventListener("resize", this.onResize, false);
		window.addEventListener("pointermove", this.onPointerMove, false);
		window.addEventListener("pointerleave", this.onPointerLeave, false);
		window.addEventListener("scroll", this.onScroll, false);
		this.frame = requestAnimationFrame(this.renderLoop);
	}

	/**
	 * Calculates the midpoint of the grid region and dimensions of the region
	 * @returns a vec4 containing the midpoint and the width/height
	 */
	calculateGridBoundingRect() {
		const { region } = this;
		const rect = region.getBoundingClientRect();
		return [rect.x + rect.width / 2, rect.y + rect.height / 2, rect.width, rect.height];
	}

	/**
	 * Calclulate perspective projection matrix
	 * @returns a 4x4 matrix containing the perspective matrix
	 */
	calculatePerspective() {
		const { canvas, camera } = this;
		const fieldOfView = 2 * Math.atan(canvas.clientHeight / 2 / camera.position.z) * (180 / Math.PI);
		const aspectRatio = canvas.clientWidth / canvas.clientHeight;
		return perspective(fieldOfView, aspectRatio, 0.01, 100);
	}

	/**
	 * Gets the current Device Pixel Ratio, max 2
	 * DPR > 2 can have a performance impact so this is why we limit it to 2
	 * @returns {number} current device pixel ratio, max 2
	 */
	getCurrentDPR() {
		return Math.min(2, window.devicePixelRatio);
	}

	/**
	 * RenderLoop (onRequestAnimationFrame event)
	 */
	renderLoop = () => {
		const { material, clock, renderer } = this;
		material.uniforms.time = clock.elapsedTime * 1e-3;
		const bgStyle = getComputedStyle(document.body).backgroundColor;
		const bg = parseInt(bgStyle.slice(bgStyle.indexOf("(") + 1, bgStyle.indexOf(",")), 10) / 255;
		const fg = 1 - bg;
		material.uniforms.bg = [bg, bg, bg, 1];
		material.uniforms.fg = [fg, fg, fg, 1];
		renderer.render(this.scene);
		this.frame = requestAnimationFrame(this.renderLoop);
	};

	/**
	 * onResize event
	 */
	onResize = () => {
		const { canvas, material, camera } = this;
		this.dpr = this.getCurrentDPR();
		this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
		material.uniforms.resolution = [canvas.clientWidth, canvas.clientHeight];
		material.uniforms.dpr = this.dpr;
		material.uniforms.projectionMatrix = this.calculatePerspective();
		material.uniforms.gridBoundingRect = this.calculateGridBoundingRect();
	};

	/**
	 * onChangeReduceMotion event
	 * @param {MediaQueryListEvent} e
	 */
	onChangeReduceMotion = (e) => {
		const { clock } = this;
		if (e.matches) {
			clock.stop();
		} else {
			clock.start();
		}
	};

	/**
	 * onPointerMove event
	 * @param {PointerEvent} e pointer event
	 */
	onPointerMove = (e) => {
		const { canvas, pointer, material } = this;
		const rect = canvas.getBoundingClientRect();
		pointer.x = e.clientX - rect.x;
		pointer.y = e.clientY - rect.y;
		const aspect = canvas.clientWidth / canvas.clientHeight;
		material.uniforms.pointer = [pointer.x, canvas.clientHeight - pointer.y];
	};

	/**
	 * onPointerLeave event
	 * @param {PointerEvent} e pointer event
	 */
	onPointerLeave = (e) => {
		const { pointer, material } = this;
		if (e && e.pointerType !== "mouse") {
			return;
		}
		pointer.x = NaN;
		pointer.y = NaN;
		material.uniforms.pointer = [-1000, -1000];
	};

	/**
	 * onScroll event
	 */
	onScroll = () => {
		const { material } = this;
		material.uniforms.gridBoundingRect = this.calculateGridBoundingRect();
	};
}
