import Swiper, { SwiperOptions } from "swiper";

class Slider {
	swiper: Swiper;
	sliderOptions: SwiperOptions = {
		direction: "horizontal",
		slidesPerView: "auto",
		spaceBetween: 12,
		slidesOffsetAfter: 24,
		breakpoints: {
			// when window width is >= 600
			600: {
				spaceBetween: 16,
			},
			// when window width is >= 1024
			900: {
				spaceBetween: 24,
			},
			1800: {
				spaceBetween: 32,
			},
		},
		lazy: {
			loadPrevNext: true,
		},
		grabCursor: true,
	};

	public constructor() {
		this.bindEvents();
	}

	private bindEvents() {
		window.addEventListener("load", () => this.mountSlider(this.sliderOptions));
	}

	private mountSlider(options) {
		this.swiper = new Swiper(".swiper-container", options);
	}
}

export { Slider };
