import { throttle } from "lodash-es";

class OfferingHeader {
	private textContainer: HTMLElement;
	private textPathTop: HTMLElement;
	private textPathBottom: HTMLElement;
	private textPathTopMobile: HTMLElement;
	private textPathBottomMobile: HTMLElement;
	private showAnimations: MediaQueryList;

	public constructor() {
		this.showAnimations = window.matchMedia("(prefers-reduced-motion: no-preference)");
		this.textContainer = document.querySelector(".offering__heading-wrapper");

		if (!this.textContainer) {
			return;
		}

		this.textPathTop = this.textContainer.querySelector(".offering__heading-top");
		this.textPathBottom = this.textContainer.querySelector(".offering__heading-bottom");
		this.textPathTopMobile = this.textContainer.querySelector(".offering__heading-top.is-mobile");
		this.textPathBottomMobile = this.textContainer.querySelector(".offering__heading-bottom.is-mobile");

		this.bindEvents();
	}

	private bindEvents() {
		document.addEventListener("scroll", throttle(this.scrollHandler.bind(this), 150));
	}

	private updateTextPathOffset(offsetTop: number, offsetBottom: number) {
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

	private scrollHandler() {
		requestAnimationFrame(() => {
			const rect = this.textContainer.getBoundingClientRect();
			const scrollPercent = rect.y / window.innerHeight;
			const offsetTop = scrollPercent * this.textPathTop.clientWidth * 0.5 - this.textPathTop.clientWidth / 4;
			const offsetBottom = scrollPercent * this.textPathBottom.clientWidth * -0.75;

			if (this.showAnimations.matches) {
				this.updateTextPathOffset(offsetTop, offsetBottom);
			}
		});
	}
}

export { OfferingHeader };
