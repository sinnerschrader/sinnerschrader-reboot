export class ProfileLinkContactForm {
	constructor() {
		this.container = document.querySelector(".profile-link-contact-form");
		if (!this.container) return;

		this.firstPage = this.container.querySelector('[data-js-item="profile-link-contact-form-content"]');
		this.secondPage = this.container.querySelector('[data-js-item="profile-link-contact-form-content-hidden"]');
		this.profileInputPage = this.container.querySelector('[data-js-item="profile-link-contact-form-send-profile"]');
		this.successPage = this.container.querySelector('[data-js-item="profile-link-contact-form-success-page"]');
		this.forwardBtn = this.firstPage.querySelector('[data-js-atom="profile-link-contact-form-forward"]');
		this.backwardBtn = this.secondPage.querySelector('[data-js-atom="profile-link-contact-form-backward"]');
		this.sendProfileBtn = this.secondPage.querySelector('[data-js-atom="profile-link-contact-form-send-profile"]');

		this.bindEvents();
	}

	bindEvents() {
		this.forwardBtn.addEventListener("click", this.togglePages.bind(this));
		this.backwardBtn.addEventListener("click", this.togglePages.bind(this));
		this.showSuccessPage();
	}

	togglePages() {
		this.firstPage.classList.toggle("active");
		this.secondPage.classList.toggle("active");

		if (this.firstPage.classList.contains("active")) {
			this.firstPage.getElementsByTagName("button")[0].setAttribute("tabindex", -1);
			this.secondPage.getElementsByTagName("button")[0].removeAttribute("tabindex");
		} else if (this.secondPage.classList.contains("active")) {
			this.secondPage.getElementsByTagName("button")[0].setAttribute("tabindex", -1);
			this.firstPage.getElementsByTagName("button")[0].removeAttribute("tabindex");
		}
	}

	showSuccessPage() {
		this.sendProfileBtn.addEventListener("click", () => {
			this.profileInputPage.classList.add("hidden");
			this.successPage.classList.remove("hidden");
		});
	}
}
