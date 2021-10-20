export class Notification {
	constructor(notificationId) {
		this.notificationId = notificationId;
		this.notificationElement = document.getElementById(this.notificationId);
		this.notificationElement.querySelector(".notification__icon").addEventListener("click", () => {
			this.hide();
		});
	}

	show() {
		this.notificationElement.classList.add("active");
		if (this.timeoutId !== undefined) {
			clearTimeout(this.timeoutId);
		}
		this.timeoutId = setTimeout(() => {
			this.hide();
		}, 3000);
	}

	hide() {
		this.notificationElement.classList.remove("active");
	}
}
