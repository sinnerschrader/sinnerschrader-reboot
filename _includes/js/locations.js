import { waitForInitialPaint } from "./utils";

export class Locations {
	data = LOCATION_DATA;

	LINK_NAME = "locations__navigation-link";
	CONTENT_NAME = "locations__id";

	CONTENT_HIDDEN_CLASS = "locations__content--hidden";

	LINK_SELECTED_CLASS = "locations__navigation-link--selected";

	locationContainers = [];
	locationLinks = [];

	constructor() {
		window.addEventListener("DOMContentLoaded", () => {
			this.loadLocationContainers();
			this.loadLocationLinks();
		});
	}

	linkId = (locationName) => `${this.LINK_NAME}-${locationName}`;

	contentClassName = (locationName) => `${this.CONTENT_NAME}-${locationName}`;

	loadLocationLinks = () => {
		this.locationLinks = this.data.map((location) => {
			const link = document.getElementById(this.linkId(location.name));

			if (link) {
				link.addEventListener("click", this.renderSelectedLocation(location.name));
			}

			return link;
		});
	};

	loadLocationContainers = () => {
		this.locationContainers = this.data
			.map((location) => document.getElementsByClassName(this.contentClassName(location.name)))
			.reduce((acc, current) => [...acc, ...current], []);
	};

	renderSelectedLocation = (newName) => () => {
		this.locationLinks.forEach((locationLink) => {
			const isSelected = locationLink.id === this.linkId(newName);

			if (isSelected) {
				locationLink.classList.add(this.LINK_SELECTED_CLASS);
			} else {
				locationLink.classList.remove(this.LINK_SELECTED_CLASS);
			}
		});

		this.locationContainers.forEach((locationContainer) => {
			const isShown = locationContainer.classList.contains(this.contentClassName(newName));

			if (isShown) {
				locationContainer.classList.remove(this.CONTENT_HIDDEN_CLASS);
			} else {
				locationContainer.classList.add(this.CONTENT_HIDDEN_CLASS);
			}
		});
	};
}
