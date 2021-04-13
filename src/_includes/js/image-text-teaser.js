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
		console.log(this.defaultContent, this.hiddenContent, this.forwardBtn, this.backwardBtn);
		this.forwardBtn.addEventListener("click", this.moveToHiddenContent.bind(this));
		this.backwardBtn.addEventListener("click", this.moveToDefaultContent.bind(this));
	}

	moveToHiddenContent() {
		this.hiddenContent.classList.add("is-active");
		this.defaultContent.classList.add("is-hidden");
	}

	moveToDefaultContent() {
		this.hiddenContent.classList.remove("is-active");
		this.defaultContent.classList.remove("is-hidden");
	}
}
