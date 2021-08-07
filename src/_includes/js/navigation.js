import throttle from "lodash-es/throttle";

class Navigation {
	topPositionColorDark = false;
	topPositionColorLight = false;
	bodyOverlayClass = "is-no-scroll";
	mobileActiveClass = "is-mobile-active";
	transparentClass = "is-transparent";
	mobileNavHiddenClass = "is-mobile-nav-hidden";
	lastScrollTop = 0;

	constructor() {
		this.init();
	}

	init() {
		this.navigationContainer = document.querySelector(".nav");
		if (!this.navigationContainer) return;

		this.mobileToggleBtn = this.navigationContainer.querySelector(".nav__mobile-toggle");
		this.textColorModifier = this.navigationContainer.getAttribute("data-js-option");

		if (this.textColorModifier === "is-text-dark") {
			this.topPositionColorDark = true;
		} else if (this.textColorModifier === "is-text-light") {
			this.topPositionColorLight = true;
		}

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

		const isMobileMenuExpandend = this.navigationContainer.classList.contains("is-mobile-active");
		this.mobileToggleBtn.setAttribute("aria-expanded", isMobileMenuExpandend);
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
			this.navigationContainer.classList.add(this.mobileNavHiddenClass);
		} else {
			this.navigationContainer.classList.remove(this.mobileNavHiddenClass);
		}
	}

	detectPageTop(scrollPosition) {
		if (scrollPosition <= 0) {
			this.topPositionColorDark ? this.navigationContainer.classList.add("is-text-dark") : "";
			this.topPositionColorLight ? this.navigationContainer.classList.add("is-text-light") : "";
		} else {
			this.topPositionColorDark ? this.navigationContainer.classList.remove("is-text-dark") : "";
			this.topPositionColorLight ? this.navigationContainer.classList.remove("is-text-light") : "";
		}
	}

	toggleTransparentClass(scrollPosition) {
		if (scrollPosition <= 150) {
			this.navigationContainer.classList.add(this.transparentClass);
			this.topPositionColorDark ? this.navigationContainer.classList.add("is-text-dark") : "";
			this.topPositionColorLight ? this.navigationContainer.classList.add("is-text-light") : "";
		} else {
			this.navigationContainer.classList.remove(this.transparentClass);
			this.topPositionColorDark ? this.navigationContainer.classList.remove("is-text-dark") : "";
			this.topPositionColorLight ? this.navigationContainer.classList.remove("is-text-light") : "";
		}
	}
}

export { Navigation };
