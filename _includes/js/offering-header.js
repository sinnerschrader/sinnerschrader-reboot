import { throttle } from "lodash-es";

class OfferingHeader {
	textContainer = document.querySelector(".offering__heading-wrapper");
	textPathTop = document.querySelector(".offering__heading-top");
	textPathBottom = document.querySelector(".offering__heading-bottom");
	textPathTopMobile = document.querySelector(".offering__heading-top.is-mobile");
	textPathBottomMobile = document.querySelector(".offering__heading-bottom.is-mobile");

	constructor() {
		this.init();
	}

	init() {
		this.bindEvents();
	}

	bindEvents() {
		document.addEventListener("scroll", throttle(this.scrollHandler.bind(this), 150));
	}

	updateTextPathOffset(offsetTop, offsetBottom) {
		if (document.documentElement.clientWidth < 600) {
			this.textPathTop.style.transform = `translateX(${offsetTop}px)`;
			this.textPathTopMobile.style.transform = `translateX(${offsetBottom}px)`;
			this.textPathBottom.style.transform = `translateX(${offsetTop}px)`;
			this.textPathBottomMobile.style.transform = `translateX(${offsetBottom}px)`;
		} else {
			this.textPathTop.style.transform = `translateX(${offsetTop}px)`;
			this.textPathBottom.style.transform = `translateX(${offsetBottom}px)`;
		}
	}

	scrollHandler() {
		requestAnimationFrame(() => {
			let rect = this.textContainer.getBoundingClientRect();
			let scrollPercent = rect.y / window.innerHeight;
			let offsetTop = scrollPercent * this.textPathTop.clientWidth * 0.5 - this.textPathTop.clientWidth / 4;
			let offsetBottom = scrollPercent * this.textPathBottom.clientWidth * -0.75;

			this.updateTextPathOffset(offsetTop, offsetBottom);
		});
	}
}

export { OfferingHeader };
