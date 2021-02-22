import { throttle } from "lodash-es";

class BackgroundScrollAnimation {
	animationStartElement = [];
	animationOffsetTop = 300;
	animationOffsetBottom = 500;

	constructor() {
		this.init();
	}

	init() {
		this.animationStartElement = [document.querySelector(".offering"), document.querySelector(".work")];

		this.bindEvents();
	}

	bindEvents() {
		window.addEventListener("load", () => this.scrollListener());
		// Load the detection once first to check if the element is already on load in the viewport
		this.viewPortDetection();
	}

	scrollListener() {
		document.addEventListener("scroll", throttle(this.viewPortDetection.bind(this), 200));
	}

	viewPortDetection() {
		const elementsInViewport = this.animationStartElement.some((el) => this.isInViewport(el));

		elementsInViewport ? this.toggleBackground("dark") : this.toggleBackground("light");
	}

	toggleBackground(mode) {
		if (mode === "dark") {
			document.body.classList.add("is-dark");
		} else {
			document.body.classList.remove("is-dark");
		}
	}

	isInViewport(el) {
		const { top, bottom } = el.getBoundingClientRect();
		const vHeight = window.innerHeight || document.documentElement.clientHeight;

		return (top > 0 || bottom > 0) && top + this.animationOffsetTop < vHeight && bottom > this.animationOffsetBottom;
	}
}

export { BackgroundScrollAnimation };
