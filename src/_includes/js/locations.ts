export class Locations {
	private container: HTMLElement;
	private tabs: NodeListOf<HTMLElement>;
	private tabpanels: NodeListOf<HTMLElement>;
	private activeTab: HTMLElement;

	public constructor() {
		this.container = document.querySelector(".locations");

		if (!this.container) {
			return;
		}

		this.tabs = this.container.querySelectorAll("[role=tab]");
		this.tabpanels = this.container.querySelectorAll("[role=tabpanel]");
		this.activeTab = this.container.querySelector("[role=tab][aria-selected=true]");

		this.bindEvents();
	}

	private bindEvents() {
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

	private selectLocationHandler(id: string, e?: KeyboardEvent) {
		this.setActiveControlTab(id);
		this.setActivePanel(id, e);
	}

	private setActiveControlTab(id: string) {
		for (let tab of this.tabs) {
			if (tab.getAttribute("aria-controls") === id) {
				tab.setAttribute("aria-selected", "true");
				this.activeTab = tab;
			} else {
				tab.setAttribute("aria-selected", "false");
			}
		}
	}

	private setActivePanel(id: string, e: KeyboardEvent) {
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

	private setTabpanelFocus(panel: HTMLElement) {
		const focusableElements = panel.querySelectorAll("a");

		focusableElements[0].focus();
	}
}
