export class ShareButtons {
	constructor() {
		this.container = document.querySelector(".share-buttons");
		this.shareUrlBtn = this.container.querySelector("#js-linkShareButton");
		this.shareUrlBtn.addEventListener("click", () => this.copyCurrentWindowLocationToClipboard());
	}

	copyCurrentWindowLocationToClipboard() {
		const copyLink = window.location.origin + window.location.pathname;

		navigator.clipboard.writeText(copyLink).then(
			() => {
				// TODO: Implement notification after design input
				alert("Copied");
			},
			() => {
				// TODO: Implement notification after design input
				alert("failed");
			}
		);
	}
}
