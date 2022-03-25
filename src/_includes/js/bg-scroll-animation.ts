import { throttle } from "lodash-es";

class BackgroundScrollAnimation {
	private animationStartElements: NodeListOf<HTMLElement>;
	private animationOffsetTop = 300;
	private animationOffsetBottom = 500;
	private circleElement: HTMLElement;
	private showAnimations = window.matchMedia("(prefers-reduced-motion: no-preference)");

	public constructor() {
		if (document.body.classList.contains("is-bg-scroll")) {
			this.init();
		}
	}

	private init() {
		this.animationStartElements = document.querySelectorAll(".fade-bg-black");
		this.circleElement = document.querySelector(".section-header__circle > img");

		this.bindEvents();
	}

	private bindEvents() {
		window.addEventListener("load", () => this.scrollListener());

		this.viewPortDetection();
	}

	private scrollListener() {
		document.addEventListener("scroll", throttle(this.viewPortDetection.bind(this), 200));

		if (!this.circleElement) {
			return;
		}

		document.addEventListener("scroll", this.rotateCircle.bind(this));
	}

	private viewPortDetection() {
		let elementInViewport = [];

		this.animationStartElements.forEach((el) => {
			el.hasAttribute("data-no-offset-top") ? (this.animationOffsetTop = 0) : this.animationOffsetTop;
			this.isInViewport(el) ? elementInViewport.push(true) : elementInViewport.push(false);
		});

		elementInViewport.indexOf(true) !== -1 ? this.toggleBackground("dark") : this.toggleBackground("light");
	}

	private toggleBackground(mode) {
		if (mode === "dark") {
			document.body.classList.add("is-dark");
		} else {
			document.body.classList.remove("is-dark");
		}
	}

	private rotateCircle() {
		if (this.showAnimations.matches) {
			this.circleElement.style.transform = `rotate(${window.pageYOffset / 4}deg)`;
		}
	}

	private isInViewport(el) {
		if (!el) return;

		let elHeight = el.offsetHeight;
		let elWidth = el.offsetWidth;
		let bounding = el.getBoundingClientRect();
		let windowHeight;
		let windowWidth;

		if (this.detectiOS()) {
			windowHeight = document.documentElement.clientHeight;
			windowWidth = document.documentElement.clientWidth;
		} else {
			windowHeight = window.innerHeight || document.documentElement.clientHeight;
			windowWidth = window.innerWidth || document.documentElement.clientWidth;
		}

		return (
			bounding.top >= -elHeight &&
			bounding.left >= -elWidth &&
			bounding.right <= windowWidth + elWidth &&
			bounding.bottom <= windowHeight + elHeight
		);
	}

	private detectiOS() {
		return (
			["iPad Simulator", "iPhone Simulator", "iPod Simulator", "iPad", "iPhone", "iPod"].includes(navigator.platform) ||
			(navigator.userAgent.includes("Mac") && "ontouchend" in document)
		);
	}
}

export { BackgroundScrollAnimation };
