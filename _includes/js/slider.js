import Glide from "@glidejs/glide";

class Slider {
	constructor() {
		this.mountSlider();
	}

	mountSlider() {
		const slider = new Glide(".glide", {
			perView: 2,
			gap: 24,
			peek: 100,
			perTouch: 1,
			rewind: false,
			1024: {
				perView: 1,
			},
		});

		slider.mount();
	}
}

export { Slider };
