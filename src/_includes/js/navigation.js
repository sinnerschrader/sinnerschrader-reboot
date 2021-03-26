import throttle from "lodash-es/throttle";

class Navigation {
	bodyOverlayClass = "is-no-scroll";
	mobileActiveClass = "is-mobile-active";
	topClass = "is-top";
	transparentClass = "is-transparent";
	lightBackgroundClass = "is-light";
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
		this.detectScroll();

		window.addEventListener("scroll", throttle(this.detectScroll.bind(this), 50));
		this.mobileToggleBtn.addEventListener("click", this.toggleMobilePanel.bind(this));
	}

	toggleMobilePanel() {
		document.body.classList.toggle(this.bodyOverlayClass);
		this.navigationContainer.classList.toggle(this.mobileActiveClass);
	}

	detectScroll() {
		let scrollTop = window.pageYOffset;

		this.animateInOut(scrollTop);
		this.detectPageTop(scrollTop);
		this.toggleTransparentClass(scrollTop);

		this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
	}

	animateInOut(scrollPosition) {
		if (scrollPosition > this.lastScrollTop) {
			this.navigationContainer.classList.remove(this.animateInClass);
			this.navigationContainer.classList.add(this.animateOutClass);
		} else {
			this.navigationContainer.classList.remove(this.animateOutClass);
			this.navigationContainer.classList.add(this.animateInClass);
		}
	}

	detectPageTop(scrollPosition) {
		if (scrollPosition <= 0) {
			this.navigationContainer.classList.add(this.topClass);
		} else {
			this.navigationContainer.classList.remove(this.topClass);
		}
	}

	toggleTransparentClass(scrollPosition) {
		if (scrollPosition <= 150) {
			this.navigationContainer.classList.remove(this.lightBackgroundClass);
			this.navigationContainer.classList.add(this.transparentClass);
		} else {
			this.navigationContainer.classList.remove(this.transparentClass);
			this.navigationContainer.classList.add(this.lightBackgroundClass);
		}
	}
}

export { Navigation };
