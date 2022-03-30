import Swiper, { SwiperOptions } from "swiper";

class Offerings {
	swiper: Swiper;
	sliderOptions: SwiperOptions = {
		direction: "horizontal",
		spaceBetween: 24,
		breakpoints: {
			300: {
				slidesPerView: "auto",
				spaceBetween: 48,
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
				grabCursor: false,
			},
		},
	};

	public constructor() {
		this.bindEvents();
	}

	private bindEvents() {
		window.addEventListener("load", () => this.mountSlider(this.sliderOptions));
	}

	private mountSlider(options) {
		this.swiper = new Swiper(".offering--info", options);
	}
}

export { Offerings };
