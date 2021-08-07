import { throttle } from "lodash-es";

class JobTeaser {
	jobTeaserContainer = document.querySelector(".job-teaser");
	jobTeaserIllustration1 = document.querySelector(".job-teaser__illustration1");
	jobTeaserIllustration2 = document.querySelector(".job-teaser__illustration2");
	jobTeaserIllustration3 = document.querySelector(".job-teaser__illustration3");
	jobTeaserIllustration4 = document.querySelector(".job-teaser__illustration4");

	constructor() {
		this.init();
	}

	init() {
		this.bindEvents();
	}

	bindEvents() {
		document.addEventListener("scroll", throttle(this.updatePosition.bind(this), 200));
	}

	updatePosition() {
		if (document.documentElement.clientWidth < 600) {
			this.jobTeaserIllustration1.classList.add("position1");
			this.jobTeaserIllustration2.classList.add("position1");
		} else {
			this.jobTeaserIllustration1.classList.remove("position1");
			this.jobTeaserIllustration2.classList.remove("position1");
		}
	}
}

export { JobTeaser };
