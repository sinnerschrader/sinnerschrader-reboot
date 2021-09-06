export class ProfileLinkContactForm {
	constructor() {
		this.container = document.querySelector(".profile-link-contact-form");

		if (!this.container) return;
		console.log("whatever");

		this.defaultContent = this.container.querySelector('[data-js-item="profile-link-contact-form-content"]');
		this.hiddenContent = this.container.querySelector('[data-js-item="profile-link-contact-form-content-hidden"]');
		this.forwardBtn = this.defaultContent.querySelector('[data-js-atom="profile-link-contact-form-forward"]');
		this.backwardBtn = this.hiddenContent.querySelector('[data-js-atom="profile-link-contact-form-backward"]');

		this.bindEvents();
	}

	bindEvents() {
		this.forwardBtn.addEventListener("click", this.toggleHiddenContent.bind(this));
		this.backwardBtn.addEventListener("click", this.toggleHiddenContent.bind(this));
	}

	toggleHiddenContent() {
		this.hiddenContent.classList.toggle("is-active");
		this.defaultContent.classList.toggle("is-hidden");

		if (this.hiddenContent.classList.contains("is-active")) {
			this.hiddenContent.getElementsByTagName("button")[0].removeAttribute("tabindex");
		} else {
			this.hiddenContent.getElementsByTagName("button")[0].setAttribute("tabindex", -1);
		}

		if (this.defaultContent.classList.contains("is-hidden")) {
			this.defaultContent.getElementsByTagName("button")[0].setAttribute("tabindex", -1);
		} else {
			this.defaultContent.getElementsByTagName("button")[0].removeAttribute("tabindex");
		}
	}
}
