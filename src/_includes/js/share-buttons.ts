import { Notification } from "./notification";

export class ShareButtons {
	private container: HTMLElement;
	private shareUrlBtn: HTMLElement;
	private linkSavedNotification: Notification;

	public constructor() {
		this.container = document.querySelector(".share-buttons");
		this.shareUrlBtn = this.container.querySelector("#js-linkShareButton");
		this.shareUrlBtn.addEventListener("click", () => this.copyCurrentWindowLocationToClipboard());
		this.linkSavedNotification = new Notification("link-saved-notification");
	}

	private copyCurrentWindowLocationToClipboard() {
		const copyLink = window.location.origin + window.location.pathname;

		navigator.clipboard.writeText(copyLink).then(() => this.linkSavedNotification.show());
	}
}
