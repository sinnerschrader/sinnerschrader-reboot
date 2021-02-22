import { throttle } from "lodash-es";

class OfferingHeader {
	textContainer = document.querySelector(".offering__heading-wrapper");
	textPathTop = document.querySelector(".offering__heading-top");
	textPathBottom = document.querySelector(".offering__heading-bottom");

	constructor() {
		this.init();
	}

	init() {
		this.bindEvents();
	}

	bindEvents() {
		document.addEventListener("scroll", throttle(this.scrollHandler.bind(this), 50));
	}

	updateTextPathOffset(offsetTop, offsetBottom) {
		this.textPathTop.setAttribute("style", `transform: translate3d(${offsetTop}px, 0, 0)`);
		this.textPathBottom.setAttribute("style", `transform: translate3d(${offsetBottom}px, 0, 0)`);
	}

	scrollHandler() {
		requestAnimationFrame(() => {
			let rect = this.textContainer.getBoundingClientRect();
			let scrollPercent = rect.y / window.innerHeight;
			let offsetTop = scrollPercent * this.textPathTop.clientWidth * 0.5 - this.textPathTop.clientWidth / 2;
			let offsetBottom = scrollPercent * this.textPathBottom.clientWidth * -0.75;

			this.updateTextPathOffset(offsetTop, offsetBottom);
		});
	}
}

export { OfferingHeader };
