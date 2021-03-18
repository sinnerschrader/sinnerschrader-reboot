class Navigation {
	mobilePanelActiveClass = "is-active";

	constructor() {
		this.init();
	}

	init() {
		this.navigationContainer = document.querySelector(".nav");
		this.mobileToggleBtn = this.navigationContainer.querySelector(".nav__mobile-toggle");
		this.mobilePanel = this.navigationContainer.querySelector(".nav__offset-panel");

		this.bindEvents();
	}

	bindEvents() {
		this.mobileToggleBtn.addEventListener("click", this.toggleMobilePanel.bind(this));
	}

	toggleMobilePanel() {
		this.mobilePanel.classList.toggle(this.mobilePanelActiveClass);
	}
}

export { Navigation };
