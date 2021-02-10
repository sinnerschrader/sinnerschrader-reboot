import Glide from "@glidejs/glide";

class Slider {
	constructor() {
		const sliderOptions = {
			type: "carousel",
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
				1024: {
					perView: 1,
				},
			},
		};

		this.init();
		this.mountSlider(sliderOptions);
		this.bindEvents();
	}

	init() {
		this.slider = {};
		this.circleText = document.querySelector(".slider__circle-text");
		this.rotationAngle = 0;
	}

	bindEvents() {
		this.slider.on("run", this.rotateCircleText.bind(this));
	}

	mountSlider(options) {
		this.slider = new Glide(".glide", options);
		this.slider.mount();
	}

	rotateCircleText() {
		this.rotationAngle += 60;
		this.circleText.setAttribute("style", "transform: rotate(" + this.rotationAngle + "deg)");
	}
}

export { Slider };
