export class SlideIn {
	titles = document.querySelectorAll(".slide-in");
	hideAnimations = window.matchMedia("(prefers-reduced-motion: reduce)");
	constructor() {
		console.log(this.titles);
		if (!this.titles.length) return;

		this.init();
	}
	init() {
		let observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (this.hideAnimations.matches) {
					entry.target.style.animation = "none";
					entry.target.style.opacity = 1;
					return;
				}

				if (entry.intersectionRatio > 0) {
					entry.target.style.animation = `slidein 0.5s ${entry.target.dataset.delay} forwards ease`;
					observer.unobserve(entry.target);
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
