import throttle from "lodash.throttle";

class BackgroundScrollAnimation {
	animationStartElement = {};

	constructor() {
		this.init();
	}

	init() {
		this.animationStartElement = document.querySelectorAll('[data-js-item="bg-animation-to-black-start"]');

		this.bindEvents();
	}

	bindEvents() {
		window.addEventListener("load", () => this.scrollListener());
		// Load the detection once first to check if the element is already on load in the viewport
		this.viewPortDetection();
	}

	scrollListener() {
		document.addEventListener("scroll", throttle(this.scrollHandler.bind(this), 200));
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
		console.log("Someone is scrolling", scroll);
		this.animationStartElement.forEach((el) => {
			this.isInViewport(el) ? this.toggleBackground("dark") : this.toggleBackground("light");
		});
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

		return (top > 0 || bottom > 0) && top < vHeight;
	}
}

export { BackgroundScrollAnimation };
