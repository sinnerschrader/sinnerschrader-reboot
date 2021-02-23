import simpleParallax from "simple-parallax-js";

class Parallax {
	constructor() {
		this.init();
	}

	init() {
		const fastElements = document.querySelectorAll(".parallax-fast");
		const mediumElements = document.querySelectorAll(".parallax-medium");
		const slowElements = document.querySelectorAll(".parallax-slow");

		new simpleParallax(fastElements, {
			scale: 1.3,
		});
		new simpleParallax(mediumElements, {
			scale: 1.2,
		});
		new simpleParallax(slowElements, {
			scale: 1.1,
		});
	}
}

export { Parallax };
