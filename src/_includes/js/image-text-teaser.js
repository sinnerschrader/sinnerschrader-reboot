export class ImageTextTeaser {
	constructor() {
		this.container = document.querySelector(".image-text-teaser");

		if (!this.container) return;

		this.defaultContent = this.container.querySelector('[data-js-item="image-text-teaser-content"]');
		this.hiddenContent = this.container.querySelector('[data-js-item="image-text-teaser-content-hidden"]');
		this.forwardBtn = this.defaultContent.querySelector('[data-js-atom="image-text-teaser-forward"]');
		this.backwardBtn = this.hiddenContent.querySelector('[data-js-atom="image-text-teaser-backward"]');

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
