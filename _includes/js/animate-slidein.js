export class SlideIn {
	titles = document.querySelectorAll(".slide-in");
	constructor() {
		this.init();
	}
	init() {
		let observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.intersectionRatio > 0) {
					entry.target.style.animation = `slidein 0.5s ${entry.target.dataset.delay} forwards ease`;
				} else {
					entry.target.style.animation = "none";
				}
			});
		});
		this.titles.forEach((title) => {
			observer.observe(title);
		});
	}
}
