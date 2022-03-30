export class InteractiveContent {
	constructor(selector) {
		this.container = document.querySelector(`.${selector}`);
		console.log(this.container);
		if (!this.container) return;

		this.firstPage = this.container.querySelector(`[data-js-item="${selector}-content"]`);
		this.secondPage = this.container.querySelector(`[data-js-item="${selector}-content-hidden"]`);
		this.forwardBtn = this.firstPage.querySelector(`[data-js-atom="${selector}-forward"]`);
		this.backwardBtn = this.secondPage.querySelector(`[data-js-atom="${selector}-backward"]`);

		this.bindEvents();
	}

	bindEvents() {
		this.forwardBtn.addEventListener("click", this.togglePages.bind(this));
		this.backwardBtn.addEventListener("click", this.togglePages.bind(this));
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
