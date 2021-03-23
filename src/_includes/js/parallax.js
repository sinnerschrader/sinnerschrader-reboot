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
		if (this.fastElements) {
			new simpleParallax(this.fastElements, {
				scale: 1.3,
			});
		}

		if (this.mediumElements) {
			new simpleParallax(this.mediumElements, {
				scale: 1.2,
			});
		}

		if (this.slowElements) {
			new simpleParallax(this.slowElements, {
				scale: 1.1,
			});
		}
	}
}

export { Parallax };
