import simpleParallax from "simple-parallax-js";

class Parallax {
	constructor() {
		this.init();
	}

	init() {
		const fastElements = document.querySelectorAll('[class="parallax-fast"]');
		const mediumElements = document.querySelectorAll('[class="parallax-medium"]');
		const slowElements = document.querySelectorAll('[class="parallax-slow"]');

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
