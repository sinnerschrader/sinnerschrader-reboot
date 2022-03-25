import throttle from "lodash-es/throttle";

class Navigation {
	private topPositionColorDark = false;
	private topPositionColorLight = false;
	private bodyOverlayClass = "is-no-scroll";
	private mobileActiveClass = "is-mobile-active";
	private transparentClass = "is-transparent";
	private mobileNavHiddenClass = "is-mobile-nav-hidden";
	private lastScrollTop = 0;

	private navigationContainer: HTMLElement;
	private jobFilterBar: HTMLElement;
	private mobileToggleBtn: HTMLElement;
	private textColorModifier: string;

	public constructor() {
		this.init();
	}

	private init() {
		this.navigationContainer = document.querySelector(".nav");

		if (!this.navigationContainer) {
			return;
		}

		this.jobFilterBar = document.querySelector("#js-job-filter-bar");
		this.mobileToggleBtn = this.navigationContainer.querySelector(".nav__mobile-toggle");
		this.textColorModifier = this.navigationContainer.getAttribute("data-js-option");

		if (this.textColorModifier === "is-text-dark") {
			this.topPositionColorDark = true;
		} else if (this.textColorModifier === "is-text-light") {
			this.topPositionColorLight = true;
		}

		this.bindEvents();
	}

	private bindEvents() {
		this.detectScroll();

		window.addEventListener("scroll", throttle(this.detectScroll.bind(this), 50));

		this.mobileToggleBtn.addEventListener("click", this.toggleMobilePanel.bind(this));
	}

	private toggleMobilePanel() {
		document.body.classList.toggle(this.bodyOverlayClass);
		this.navigationContainer.classList.toggle(this.mobileActiveClass);

		const isMobileMenuExpandend = this.navigationContainer.classList.contains("is-mobile-active");
		this.mobileToggleBtn.setAttribute("aria-expanded", isMobileMenuExpandend ? "true" : "false");
	}

	private detectScroll() {
		let scrollTop = window.pageYOffset;

		this.animateInOut(scrollTop);
		this.detectPageTop(scrollTop);
		this.toggleTransparentClass(scrollTop);

		this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
	}

	private animateInOut(scrollPosition) {
		if (scrollPosition > this.lastScrollTop) {
			this.navigationContainer.classList.add(this.mobileNavHiddenClass);
			this.jobFilterBar?.classList.add(this.mobileNavHiddenClass);
		} else {
			this.navigationContainer.classList.remove(this.mobileNavHiddenClass);
			this.jobFilterBar?.classList.remove(this.mobileNavHiddenClass);
		}
	}

	private detectPageTop(scrollPosition) {
		if (scrollPosition <= 0) {
			this.topPositionColorDark ? this.navigationContainer.classList.add("is-text-dark") : "";
			this.topPositionColorLight ? this.navigationContainer.classList.add("is-text-light") : "";
		} else {
			this.topPositionColorDark ? this.navigationContainer.classList.remove("is-text-dark") : "";
			this.topPositionColorLight ? this.navigationContainer.classList.remove("is-text-light") : "";
		}
	}

	private toggleTransparentClass(scrollPosition) {
		if (this.lastScrollTop >= scrollPosition) {
			if (scrollPosition <= 0) {
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
}

export { Navigation };
