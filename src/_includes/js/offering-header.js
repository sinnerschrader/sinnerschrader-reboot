import { throttle } from "lodash-es";

class OfferingHeader {
	constructor() {
		this.textContainer = document.querySelector(".offering__heading-wrapper");
		this.showAnimations = window.matchMedia("(prefers-reduced-motion: no-preference)");

		if (!this.textContainer) return;

		this.textPathTop = this.textContainer.querySelector(".offering__heading-top");
		this.textPathBottom = this.textContainer.querySelector(".offering__heading-bottom");
		this.textPathTopMobile = this.textContainer.querySelector(".offering__heading-top.is-mobile");
		this.textPathBottomMobile = this.textContainer.querySelector(".offering__heading-bottom.is-mobile");

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

			if (this.showAnimations.matches) {
				this.updateTextPathOffset(offsetTop, offsetBottom);
			}
		});
	}
}

export { OfferingHeader };
