import Swiper from "swiper";

class Slider {
	constructor() {
		this.swiper = {};
		this.sliderOptions = {
			direction: "horizontal",
			slidesPerView: "auto",
			spaceBetween: 12,
			slidesOffsetAfter: 24,
			breakpoints: {
				// when window width is >= 600
				500: {
					spaceBetween: 16,
				},
				// when window width is >= 1024
				900: {
					spaceBetween: 24,
				},
			},
			lazy: {
				loadPrevNext: true,
			},
			grabCursor: true,
		};

		this.bindEvents();
	}

	bindEvents() {
		window.addEventListener("load", () => this.mountSlider(this.sliderOptions));
	}

	mountSlider(options) {
		this.swiper = new Swiper(".swiper-container", options);
	}
}

export { Slider };
