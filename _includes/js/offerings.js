import Swiper from "swiper";

class Offerings {
	constructor() {
		this.swiper = {};
		this.sliderOptions = {
			direction: "horizontal",
			spaceBetween: 12,
			breakpoints: {
				300: {
					slidesPerView: 1,
					grabCursor: true,
				},
				450: {
					slidesPerView: 2,
					grabCursor: true,
					spaceBetween: 24,
				},
				900: {
					slidesPerView: 4,
					spaceBetween: 36,
					allowTouchMove: false,
					noSwiping: true,
					draggable: false,
					grabCursor: false,
				},
			},
		};

		this.bindEvents();
	}

	bindEvents() {
		window.addEventListener("load", () => this.mountSlider(this.sliderOptions));
	}

	mountSlider(options) {
		this.swiper = new Swiper(".offering--info", options);
	}
}

export { Offerings };
