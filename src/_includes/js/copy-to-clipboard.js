export class CopyToClipboard {
	constructor() {
		this.shareLinks = document.querySelectorAll(`[id='js-linkShareButton']`);

		if (!this.shareLinks) return;

		this.bindEvents();
	}

	bindEvents() {
		for (let link of this.shareLinks) {
			link.addEventListener("click", this.getUrl.bind(this));
		}
	}

	getUrl() {
		const url = window.location.href;

		navigator.clipboard.writeText(url).then(() => console.info("url copied"));
	}
}
