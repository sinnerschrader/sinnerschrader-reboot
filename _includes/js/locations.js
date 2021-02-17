export class Locations {
	data = LOCATION_DATA;

	BUTTON_NAME = "locations__navigation-button";
	CONTENT_NAME = "locations__content";

	CONTENT_HIDDEN_CLASS = this.CONTENT_NAME + "--hidden";
	BUTTON_SELECTED_CLASS = this.BUTTON_NAME + "--selected";

	locationContainers = [];
	locationButtons = [];
	locationIndicator;

	timeouts = [];

	constructor() {
		this.loadLocationContainers();
		this.loadLocationLinks();
		this.loadLocationIndicator();

		this.renderSelectedLocation(this.data[0].name);
	}

	linkId = (locationName) => `${this.BUTTON_NAME}-${locationName}`;
	contentClassName = (locationName) => `${this.CONTENT_NAME}-${locationName}`;

	loadLocationIndicator = () => {
		this.locationIndicator = document.getElementById("locations__navigation-indicator");
	};

	loadLocationLinks = () => {
		this.locationButtons = this.data.map((location) => {
			const link = document.getElementById(this.linkId(location.name));

			if (link) {
				link.addEventListener("click", () => this.renderSelectedLocation(location.name));
			}

			return link;
		});
	};

	loadLocationContainers = () => {
		this.locationContainers = this.data
			.map((location) => document.getElementsByClassName(this.contentClassName(location.name)))
			.reduce((acc, current) => [...acc, ...current], []);
	};

	renderSelectedLocation = (newName) => {
		this.locationButtons.forEach((button) => {
			if (!button) return;

			const isSelected = button.id === this.linkId(newName);

			if (isSelected) {
				this.locationIndicator.style.top = button.offsetTop + button.clientHeight / 2;
				button.classList.add(this.BUTTON_SELECTED_CLASS);
			} else {
				button.classList.remove(this.BUTTON_SELECTED_CLASS);
			}
		});

		this.timeouts = this.timeouts.map(clearTimeout);

		this.locationContainers.forEach((container) => {
			if (!container) return;

			const isShown = container.classList.contains(this.contentClassName(newName));

			let animationCallback;
			if (isShown) {
				container.style.display = "block";

				animationCallback = () => {
					container.classList.remove(this.CONTENT_HIDDEN_CLASS);
				};
			} else {
				container.classList.add(this.CONTENT_HIDDEN_CLASS);

				animationCallback = () => {
					container.style.display = "none";
				};
			}

			const timeout = setTimeout(animationCallback, 200);
			this.timeouts.push(timeout);
		});
	};
}
