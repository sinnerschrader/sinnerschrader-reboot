import throttle from "lodash-es/throttle";

class Navigation {
	bodyOverlayClass = "is-no-scroll";
	mobileActiveClass = "is-mobile-active";
	topClass = "is-top";
	animateInClass = "is-animate-in";
	animateOutClass = "is-animate-out";
	lastScrollTop = 0;

	constructor() {
		this.init();
	}

	init() {
		this.navigationContainer = document.querySelector(".nav");
		this.mobileToggleBtn = this.navigationContainer.querySelector(".nav__mobile-toggle");

		this.bindEvents();
	}

	bindEvents() {
		this.onLoadPosition();

		window.addEventListener("scroll", throttle(this.detectScroll.bind(this), 50));
		this.mobileToggleBtn.addEventListener("click", this.toggleMobilePanel.bind(this));
	}

	onLoadPosition() {
		if (window.pageYOffset <= 150) {
			this.navigationContainer.classList.add(this.topClass);
		}
	}

	toggleMobilePanel() {
		document.body.classList.toggle(this.bodyOverlayClass);
		this.navigationContainer.classList.toggle(this.mobileActiveClass);
	}

	detectScroll() {
		let scrollTop = window.pageYOffset;

		if (scrollTop > this.lastScrollTop) {
			this.navigationContainer.classList.remove(this.animateInClass);
			this.navigationContainer.classList.add(this.animateOutClass);
		} else {
			this.navigationContainer.classList.remove(this.animateOutClass);
			this.navigationContainer.classList.add(this.animateInClass);
		}

		if (scrollTop <= 150) {
			this.navigationContainer.classList.add(this.topClass);
		} else {
			this.navigationContainer.classList.remove(this.topClass);
		}

		this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
	}
}

export { Navigation };
