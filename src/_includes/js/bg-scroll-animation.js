import { throttle } from "lodash-es";

class BackgroundScrollAnimation {
	animationStartElements = [];
	animationOffsetTop = 300;
	animationOffsetBottom = 500;

	showAnimations = window.matchMedia("(prefers-reduced-motion: no-preference)");

	constructor() {
		if (document.body.classList.contains("is-bg-scroll")) {
			this.init();
		}
	}

	init() {
		this.animationStartElements = document.querySelectorAll(".fade-bg-black");
		this.circleElement = document.querySelector(".section-header__circle > img");

		this.bindEvents();
	}

	bindEvents() {
		window.addEventListener("load", () => this.scrollListener());

		this.viewPortDetection();
	}

	scrollListener() {
		document.addEventListener("scroll", throttle(this.viewPortDetection.bind(this), 200));

		if (!this.circleElement) return;

		document.addEventListener("scroll", this.rotateCircle.bind(this));
	}

	viewPortDetection() {
		let elementInViewport = [];

		this.animationStartElements.forEach((el) => {
			el.hasAttribute("data-no-offset-top") ? (this.animationOffsetTop = 0) : this.animationOffsetTop;
			this.isInViewport(el) ? elementInViewport.push(true) : elementInViewport.push(false);
		});

		elementInViewport.indexOf(true) !== -1 ? this.toggleBackground("dark") : this.toggleBackground("light");
	}

	toggleBackground(mode) {
		if (mode === "dark") {
			document.body.classList.add("is-dark");
		} else {
			document.body.classList.remove("is-dark");
		}
	}

	rotateCircle() {
		if (this.showAnimations.matches) {
			this.circleElement.style.transform = `rotate(${window.pageYOffset / 4}deg)`;
		}
	}

	isInViewport(el) {
		if (!el) return;

		const { top, bottom } = el.getBoundingClientRect();
		const vHeight = document.body.clientHeight;

		return (top > 0 || bottom > 0) && top + this.animationOffsetTop < vHeight && bottom > this.animationOffsetBottom;
	}
}

export { BackgroundScrollAnimation };
