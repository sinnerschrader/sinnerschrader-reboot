export class ProfileLinkContactForm {
	constructor() {
		this.container = document.querySelector(".profile-link-contact-form");
		if (!this.container) return;

		this.layout = document.querySelector(".profile-link-contact-form__layout");
		this.firstPage = this.container.querySelector('[data-js-item="profile-link-contact-form-content"]');
		this.secondPage = this.container.querySelector('[data-js-item="profile-link-contact-form-content-hidden"]');
		this.forwardBtn = this.firstPage.querySelector('[data-js-atom="profile-link-contact-form-forward"]');
		this.backwardBtn = this.secondPage.querySelector('[data-js-atom="profile-link-contact-form-backward"]');
		this.captchaContainer = this.secondPage.querySelector('[data-js-atom="profile-link-contact-form-captcha-container"]');
		this.form = this.secondPage.querySelector("form");

		this.bindEvents();
		this.resizeLayout();
	}

	bindEvents() {
		this.captchaWidgetId = hcaptcha.render(this.captchaContainer, {
			sitekey: "555327a5-0262-4a9e-90c5-b257351d1317",
			theme: "dark",
			callback: this.onCaptchaSuccess.bind(this),
			"expired-callback": this.onCaptchaExpired.bind(this),
		});

		window.addEventListener("resize", this.resizeLayout.bind(this));

		this.forwardBtn.addEventListener("click", this.togglePages.bind(this));
		this.backwardBtn.addEventListener("click", this.togglePages.bind(this));

		this.form.addEventListener("submit", (event) => {
			event.preventDefault();
			this.sendProfileLinkEmail();
		});
	}

	resizeLayout() {
		const firstPageWidth = this.firstPage.clientWidth;
		const secondPageWidth = this.secondPage.clientWidth;

		const width = Math.max(firstPageWidth, secondPageWidth);

		this.container.style.width = width + "px";
		this.layout.style.width = width * 2 + "px";
	}

	onCaptchaSuccess(response) {
		this.captureResponse = response;
		this.updateSubmitButtonDisabledState();
	}

	onCaptchaExpired() {
		this.captureResponse = undefined;
		this.updateSubmitButtonDisabledState();
	}

	emailSent() {
		hcaptcha.reset(this.captchaWidgetId);
	}

	emailFailed() {}

	updateSubmitButtonDisabledState() {
		if (this.captureResponse) {
			this.form.querySelector("button").removeAttribute("disabled");
		} else {
			this.form.querySelector("button").setAttribute("disabled", true);
		}
	}

	async sendProfileLinkEmail() {
		const formData = new FormData(this.form);

		if (this.captureResponse) {
			const data = { payload: { handle: formData.get("profileLink") }, type: "only_handle", captcha: this.captureResponse };

			fetch("https://k741x3mcij.execute-api.eu-central-1.amazonaws.com/prod/emailer", {
				body: JSON.stringify(data),
				mode: "no-cors",
				method: "POST",
			})
				.then(this.emailSent)
				.catch(this.emailFailed);
		}
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
