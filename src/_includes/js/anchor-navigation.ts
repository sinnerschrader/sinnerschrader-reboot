export class AnchorNavigation {
	private container: HTMLElement;
	private hash: string;
	private links: NodeListOf<HTMLAnchorElement>;
	private activeClass = "is-active";

	public constructor() {
		this.container = document.querySelector(".anchor-navigation");

		if (!this.container) {
			return;
		}

		this.initialize();
		this.bindEvents();
	}

	private initialize() {
		this.hash = window.location.hash;
		this.links = this.container.querySelectorAll(".anchor-navigation__item-link");

		this.selectActiveLink();
	}

	private bindEvents() {
		window.addEventListener("hashchange", this.initialize.bind(this));
	}

	private selectActiveLink() {
		for (let item of this.links) {
			if (item.hash === this.hash) {
				item.classList.add(this.activeClass);
			} else {
				item.classList.remove(this.activeClass);
			}
		}
	}
}
