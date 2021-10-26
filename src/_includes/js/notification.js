export class Notification {
	constructor(notificationId) {
		this.timeout = undefined;
		this.notificationId = notificationId;
		this.notificationElement = document.getElementById(this.notificationId);

		this.notificationElement.querySelector(".notification__icon").addEventListener("click", () => {
			this.hide();
		});
	}

	show() {
		this.notificationElement.classList.add("active");

		if (this.timeout !== undefined) {
			clearTimeout(this.timeout);
		}

		this.timeout = setTimeout(() => {
			this.hide();
		}, 3000);
	}

	hide() {
		this.notificationElement.classList.remove("active");
	}
}
