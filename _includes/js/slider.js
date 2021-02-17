import Glide from "@glidejs/glide";

class Slider {
	constructor() {
		const sliderOptions = {
			type: "slider",
			perView: 2,
			gap: 24,
			peek: {
				before: 0,
				after: 100,
			},
			perTouch: 1,
			rewind: false,
			animationTimingFunc: "ease",
			breakpoints: {
				1000: {
					perView: 1,
					gap: 16,
				},
				600: {
					perView: 1,
					gap: 12,
				},
			},
		};

		this.init();
		this.mountSlider(sliderOptions);
	}

	init() {
		this.slider = {};
	}

	mountSlider(options) {
		this.slider = new Glide(".glide", options);
		this.slider.mount();
	}
}

export { Slider };
