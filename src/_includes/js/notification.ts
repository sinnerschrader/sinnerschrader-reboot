export class Notification {
	private timeout?: NodeJS.Timeout;
	private notificationId: string;
	private notificationElement: HTMLElement;

	public constructor(notificationId: string) {
		this.timeout = undefined;
		this.notificationId = notificationId;
		this.notificationElement = document.getElementById(this.notificationId);

		this.notificationElement.querySelector("img").addEventListener("click", () => {
			this.hide();
		});
	}

	public show() {
		this.notificationElement.classList.add("active");

		if (this.timeout !== undefined) {
			clearTimeout(this.timeout);
		}

		this.timeout = setTimeout(() => {
			this.hide();
		}, 3000);
	}

	private hide() {
		this.notificationElement.classList.remove("active");
	}
}
