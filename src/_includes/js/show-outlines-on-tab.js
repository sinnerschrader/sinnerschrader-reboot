class ShowOutlinesOnTab {
	constructor() {
		this.bindEvents();
	}

	bindEvents() {
		window.addEventListener("keyup", (e) => this.handleFirstTab(e));
	}

	handleFirstTab(e) {
		if (e.key === "Tab") {
			document.body.classList.add("uses-keyboard");
			window.removeEventListener("keyup", this.handleFirstTab);
		}
	}
}

export { ShowOutlinesOnTab };
