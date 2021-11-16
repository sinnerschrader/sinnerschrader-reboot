export class AnchorNavigation {
	constructor() {
		this.activeClass = "is-active";
		this.container = document.querySelector(".anchor-navigation");

		if (!this.container) return;

		this.initialize();
		this.bindEvents();
	}

	initialize() {
		this.hash = window.location.hash;
		this.links = this.container.querySelectorAll(".anchor-navigation__item-link");

		this.selectActiveLink();
	}

	bindEvents() {
		window.addEventListener("hashchange", this.initialize.bind(this));
	}

	selectActiveLink() {
		for (let item of this.links) {
			item.hash === this.hash ? item.classList.add(this.activeClass) : item.classList.remove(this.activeClass);
		}
	}
}
