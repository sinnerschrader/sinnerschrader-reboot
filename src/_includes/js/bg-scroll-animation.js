import { throttle } from "lodash-es";

class BackgroundScrollAnimation {
	animationStartElements = [];
	animationOffsetTop = 300;
	animationOffsetBottom = 500;

	showAnimations = window.matchMedia("(prefers-reduced-motion: no-preference)");

	isIOS = false;

	constructor() {
		if (document.body.classList.contains("is-bg-scroll")) {
			this.init();
		}

		this.isIOS = this.detectiOS();
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

		document.addEventListener("scroll", throttle(this.rotateCircle.bind(this), 10));
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
		if (this.showAnimations.matches && this.isInViewport(this.circleElement, true)) {
			this.circleElement.style.transform = `rotate(${window.pageYOffset / 4}deg)`;
		}
	}

	isInViewport(el, isCircle = false) {
		if (!el) return;

		let offsetBetweenCircleAndContainer = isCircle ? (el.height / 2) * Math.sqrt(2) - el.height / 2 : 0;
		let elOffsetHeight = el.offsetHeight;
		let elOffsetWidth = el.offsetWidth;
		const elHeight = el.height || 0;
		const elWidth = el.width || 0;
		let bounding = el.getBoundingClientRect();
		let windowHeight;
		let windowWidth;

		if (this.isIOS) {
			windowHeight = document.documentElement.clientHeight;
			windowWidth = document.documentElement.clientWidth;
		} else {
			windowHeight = window.innerHeight || document.documentElement.clientHeight;
			windowWidth = window.innerWidth || document.documentElement.clientWidth;
		}

		return (
			bounding.top >= -elHeight - offsetBetweenCircleAndContainer &&
			bounding.left >= -elWidth - offsetBetweenCircleAndContainer &&
			bounding.right <= windowWidth + elOffsetWidth - offsetBetweenCircleAndContainer &&
			bounding.bottom <= windowHeight + elOffsetHeight + offsetBetweenCircleAndContainer
		);
	}

	detectiOS() {
		return (
			["iPad Simulator", "iPhone Simulator", "iPod Simulator", "iPad", "iPhone", "iPod"].includes(navigator.platform) ||
			(navigator.userAgent.includes("Mac") && "ontouchend" in document)
		);
	}
}

export { BackgroundScrollAnimation };
