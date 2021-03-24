import simpleParallax from "simple-parallax-js";

class Parallax {
	showAnimations = window.matchMedia("(prefers-reduced-motion: no-preference)");
	fastElements = document.querySelectorAll(".parallax-fast");
	mediumElements = document.querySelectorAll(".parallax-medium");
	slowElements = document.querySelectorAll(".parallax-slow");

	constructor() {
		if (this.showAnimations.matches) {
			this.init();
		}
	}

	init() {
		if (this.fastElements.length) {
			new simpleParallax(this.fastElements, {
				scale: 1.3,
			});
		}

		if (this.mediumElements.length) {
			new simpleParallax(this.mediumElements, {
				scale: 1.2,
			});
		}

		if (this.slowElements.length) {
			new simpleParallax(this.slowElements, {
				scale: 1.1,
			});
		}
	}
}

export { Parallax };
