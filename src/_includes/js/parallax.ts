import simpleParallax from "simple-parallax-js";

class Parallax {
	private showAnimations: MediaQueryList;
	private fastElements: NodeListOf<HTMLElement>;
	private mediumElements: NodeListOf<HTMLElement>;
	private slowElements: NodeListOf<HTMLElement>;

	public constructor() {
		this.showAnimations = window.matchMedia("(prefers-reduced-motion: no-preference)");
		this.fastElements = document.querySelectorAll(".parallax-fast");
		this.mediumElements = document.querySelectorAll(".parallax-medium");
		this.slowElements = document.querySelectorAll(".parallax-slow");

		if (this.showAnimations.matches) {
			this.init();
		}
	}

	private init() {
		if (this.fastElements.length) {
			this.addParallax(this.fastElements, 1.3);
		}

		if (this.mediumElements.length) {
			this.addParallax(this.mediumElements, 1.2);
		}

		if (this.slowElements.length) {
			this.addParallax(this.slowElements, 1.1);
		}
	}

	private addParallax(elements: NodeListOf<Element>, scale: number) {
		/** this function exists as a wrapper for simpleParallax as
		 * the library has incorrect typings */

		/* @ts-ignore */
		new simpleParallax(elements, scale);
	}
}

export { Parallax };
