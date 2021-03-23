export class Locations {
	constructor() {
		this.container = document.querySelector(".locations");

		if (!this.container) return;

		this.tabs = this.container.querySelectorAll("[role=tab]");
		this.tabpanels = this.container.querySelectorAll("[role=tabpanel]");
		this.activeTab = this.container.querySelector("[role=tab][aria-selected=true]");

		this.bindEvents();
	}

	bindEvents() {
		for (let tab of this.tabs) {
			tab.addEventListener("click", (e) => {
				e.preventDefault();
				this.selectLocationHandler(tab.getAttribute("aria-controls"));
			});
			tab.addEventListener("keyup", (e) => {
				e.preventDefault();
				if (e.code === "Enter") {
					this.selectLocationHandler(tab.getAttribute("aria-controls"), e);
				}
			});
		}
	}

	selectLocationHandler(id, e) {
		this.setActiveControlTab(id);
		this.setActivePanel(id, e);
	}

	setActiveControlTab(id) {
		for (let tab of this.tabs) {
			if (tab.getAttribute("aria-controls") === id) {
				tab.setAttribute("aria-selected", "true");
				this.activeTab = tab;
			} else {
				tab.setAttribute("aria-selected", "false");
			}
		}
	}

	setActivePanel(id, e) {
		for (let tabpanel of this.tabpanels) {
			if (tabpanel.getAttribute("id") === id) {
				tabpanel.setAttribute("aria-expanded", "true");

				if (e !== undefined && e.code === "Enter") {
					this.setTabpanelFocus(tabpanel);
				}
			} else {
				tabpanel.setAttribute("aria-expanded", "false");
			}
		}
	}

	setTabpanelFocus(panel) {
		const focusableElements = panel.querySelectorAll("a");

		focusableElements[0].focus();
	}
}
