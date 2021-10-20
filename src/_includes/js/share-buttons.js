import { Notification } from "./notification";

export class ShareButtons {
	constructor() {
		this.container = document.querySelector(".share-buttons");
		this.shareUrlBtn = this.container.querySelector("#js-linkShareButton");
		this.shareUrlBtn.addEventListener("click", () => this.copyCurrentWindowLocationToClipboard());
		this.linkSavedNotification = new Notification("link-saved-notification");
	}

	copyCurrentWindowLocationToClipboard() {
		const copyLink = window.location.origin + window.location.pathname;

		navigator.clipboard.writeText(copyLink).then(this.linkSavedNotification.show());
	}
}
