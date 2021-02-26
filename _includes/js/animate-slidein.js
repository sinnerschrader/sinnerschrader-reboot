export class SlideIn {
	titles = document.querySelectorAll(".slide-in");
	showAnimations = window.matchMedia("(prefers-reduced-motion: no-preference)");
	constructor() {
		this.init();
	}
	init() {
		let observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.intersectionRatio > 0 && this.showAnimations.matches) {
					entry.target.style.animation = `slidein 0.5s ${entry.target.dataset.delay} forwards ease`;
				} else {
					entry.target.style.animation = "none";
					entry.target.style.opacity = 1;
				}
			});
		});
		this.titles.forEach((title) => {
			observer.observe(title);
		});
	}
}
