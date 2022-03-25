export class SlideIn {
	private titles: NodeListOf<HTMLElement>;
	private hideAnimations: MediaQueryList;

	public constructor() {
		this.titles = document.querySelectorAll(".slide-in");
		this.hideAnimations = window.matchMedia("(prefers-reduced-motion: reduce)");

		if (!this.titles.length) {
			return;
		}

		this.init();
	}

	private init() {
		const handleIntersect = (entries) => {
			entries.forEach((entry) => {
				if (this.hideAnimations.matches) {
					entry.target.style.animation = "none";
					entry.target.style.opacity = 1;
					return;
				}

				if (entry.intersectionRatio > 0) {
					entry.target.style.animation = `slidein 0.7s ${entry.target.dataset.delay} forwards ease`;
					observer.unobserve(entry.target);
				} else {
					entry.target.style.animation = "none";
				}
			});
		};

		const observer = new IntersectionObserver(handleIntersect);
		this.titles.forEach((title) => observer.observe(title));
	}
}
