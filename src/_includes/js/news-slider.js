import Swiper, { Navigation, Pagination } from "swiper";

class NewsSlider {
	constructor() {
		Swiper.use([Navigation, Pagination]);

		this.swiper = {};
		// TODO: update options
		this.sliderOptions = {
			// direction: "horizontal",
			// slidesPerView: "auto",
			// spaceBetween: 12,
			// slidesOffsetAfter: 24,
			// breakpoints: {
			// 	// when window width is >= 600
			// 	600: {
			// 		spaceBetween: 16,
			// 	},
			// 	// when window width is >= 1024
			// 	900: {
			// 		spaceBetween: 24,
			// 	},
			// 	1800: {
			// 		spaceBetween: 32,
			// 	},
			// },
			// lazy: {
			// 	loadPrevNext: true,
			// },
			// grabCursor: true,
			pagination: {
				el: ".swiper-pagination",
				type: "bullets",
				clickable: true,
				renderBullet: function (index, className) {
					console.log(index);
					return '<span class="' + className + '">' + (index + 1) + "</span>";
				},
			},
			freeMode: true,
		};

		this.bindEvents();
	}

	bindEvents() {
		window.addEventListener("load", () => this.mountSlider(this.sliderOptions));
	}

	mountSlider(options) {
		this.swiper = new Swiper(".news-slider", options);
	}
}

export { NewsSlider };
