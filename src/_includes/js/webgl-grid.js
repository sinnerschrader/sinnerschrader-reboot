import { Renderer, Mesh, createPlaneGeometry, createShaderMaterial, Stopwatch, Color } from "colorful-pixels";
import { mediaQuery } from "./media-query";
import vertexShader from "../glsl/grid-shader.vert";
import fragmentShader from "../glsl/grid-shader.frag";

export class WebGLGrid {
	reduceMotion = mediaQuery("(prefers-reduced-motion: reduce)");
	pointer = { x: NaN, y: NaN };

	constructor() {
		const canvas = document.querySelector("canvas.webgl-grid");
		if (!canvas) {
			throw Error("WebGLGrid plugin: no canvas found.");
		}
		const renderer = new Renderer(canvas);
		if (!renderer.gl) {
			// no WebGL is supported, add a class to a body so we could provide a pure CSS fallback
			document.body.classList.add("no-webgl");
			return;
		}
		const clock = new Stopwatch();
		const plane = createPlaneGeometry(2, 2, 50, 50);
		const material = createShaderMaterial(vertexShader, fragmentShader, {
			time: 0,
			resolution: [800, 600],
			bg: Color.fromHex("#ffffff"),
			fg: Color.fromHex("#000000"),
			cellSize: 40,
			edge: 0.2,
			pointer: [-1000, -1000],
		});
		const mesh = new Mesh(renderer.gl, plane, material);
		if (!this.reduceMotion.matches) {
			clock.start();
		}

		this.canvas = canvas;
		this.clock = clock;
		this.renderer = renderer;
		this.mesh = mesh;
		this.scene = [mesh];
		this.material = material;
		this.plane = plane;
		this.dpr = this.getCurrentDPR();
		this.onResize();
		this.reduceMotion.addEventListener("change", this.onChangeReduceMotion, false);
		window.addEventListener("resize", this.onResize, false);
		canvas.addEventListener("pointermove", this.onPointerMove, false);
		canvas.addEventListener("pointerleave", this.onPointerLeave, false);
		this.frame = requestAnimationFrame(this.renderLoop);
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
		renderer.render(this.scene);
		this.frame = requestAnimationFrame(this.renderLoop);
	};

	/**
	 * onResize event
	 */
	onResize = () => {
		const { canvas, material } = this;
		this.dpr = this.getCurrentDPR();
		this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
		material.uniforms.resolution = [canvas.clientWidth * this.dpr, canvas.clientHeight * this.dpr];
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
		material.uniforms.pointer = [
			(this.pointer.x / canvas.clientWidth - 0.5) * 2 * aspect,
			(this.pointer.y / canvas.clientHeight - 0.5) * -2,
		];
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
}
