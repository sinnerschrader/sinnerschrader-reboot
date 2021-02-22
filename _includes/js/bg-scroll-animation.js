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
		document.addEventListener("scroll", throttle(this.scrollHandler.bind(this), 100));
	}

	scrollHandler(e) {
		let lastKnownScrollPosition = window.scrollY;
		let ticking;

		if (!ticking) {
			window.requestAnimationFrame(() => {
				this.viewPortDetection(lastKnownScrollPosition);
				ticking = false;
			});

			ticking = true;
		}
	}

	viewPortDetection(scroll) {
		let elementsInViewport = [];

		this.animationStartElement.forEach((el) => {
			elementsInViewport.push(this.isInViewport(el));
		});

		elementsInViewport.some((e) => e === true) ? this.toggleBackground("dark") : this.toggleBackground("light");
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
