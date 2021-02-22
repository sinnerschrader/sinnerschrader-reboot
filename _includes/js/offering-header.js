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
		document.addEventListener("scroll", throttle(this.scrollHandler.bind(this), 200));
	}

	updateTextPathOffset(offsetTop, offsetBottom) {
		this.textPathTop.setAttribute("style", `transform: translateX(${offsetTop}px)`);
		this.textPathBottom.setAttribute("style", `transform: translateX(${offsetBottom}px)`);
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
