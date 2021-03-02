import Swiper from "swiper";

class Offerings {
	constructor() {
		this.swiper = {};
		this.sliderOptions = {
			direction: "horizontal",
			spaceBetween: 24,
			breakpoints: {
				300: {
					slidesPerView: "auto",
					grabCursor: true,
				},
				450: {
					slidesPerView: 2,
					grabCursor: true,
				},
				700: {
					slidesPerView: 3,
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
