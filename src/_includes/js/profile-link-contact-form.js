export class ProfileLinkContactForm {
	constructor() {
		this.container = document.querySelector(".profile-link-contact-form");
		if (!this.container) return;

		this.firstPage = this.container.querySelector('[data-js-item="profile-link-contact-form-content"]');
		this.secondPage = this.container.querySelector('[data-js-item="profile-link-contact-form-content-hidden"]');
		this.forwardBtn = this.firstPage.querySelector('[data-js-atom="profile-link-contact-form-forward"]');
		this.backwardBtn = this.secondPage.querySelector('[data-js-atom="profile-link-contact-form-backward"]');
		this.submitBtn = this.secondPage.querySelector('[data-js-atom="profile-link-contact-form-submit"]');
		this.input = this.secondPage.querySelector('[data-js-atom="profile-link-contact-form-input"]');
		this.checkbox = this.secondPage.querySelector('[data-js-atom="profile-link-contact-form-checkbox"]');
		this.captchaContainer = this.secondPage.querySelector('[data-js-atom="profile-link-contact-form-captcha-container"]');
		this.bindEvents();
	}

	bindEvents() {
		this.forwardBtn.addEventListener("click", this.togglePages.bind(this));
		this.backwardBtn.addEventListener("click", this.togglePages.bind(this));
		this.submitBtn.addEventListener("click", this.sendHandleEmail.bind(this));
		this.captchaWidget = hcaptcha.render(this.captchaContainer, {
			sitekey: "555327a5-0262-4a9e-90c5-b257351d1317",
			theme: "dark",
			callback: this.onCaptchaSuccess.bind(this),
		});
	}

	onCaptchaSuccess(response) {
		this.captchaResponse = response;
	}

	emailSent() {
		hcaptcha.reset(this.captchaWidget);
	}

	emailFailed() {}

	async sendHandleEmail() {
		console.log(this.input.value, this.checkbox.checked, this.captchaResponse);
		const data = { payload: { handle: this.input.value }, type: "only_handle", captcha: this.captchaResponse };
		fetch("https://k741x3mcij.execute-api.eu-central-1.amazonaws.com/prod/emailer", {
			body: JSON.stringify(data),
			mode: "no-cors",
			method: "POST",
		})
			.then(this.emailSent)
			.catch(this.emailFailed);
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
}
