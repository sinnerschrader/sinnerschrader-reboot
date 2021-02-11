import { waitForInitialPaint } from "./utils";

export class Locations {
	data = LOCATION_DATA;

	LINK_NAME = "locations__navigation-link";
	CONTENT_NAME = "locations__id";

	CONTENT_VISIBLE_CLASS = "locations__content";
	CONTENT_HIDDEN_CLASS = this.CONTENT_VISIBLE_CLASS + "--hidden";

	LINK_UNSELECTED_CLASS = "locations__navigation-link";
	LINK_SELECTED_CLASS = this.LINK_UNSELECTED_CLASS + "--selected";

	locationContainers = [];
	locationLinks = [];

	constructor() {
		console.log("... init Locations module ...");
		waitForInitialPaint().then(this.init);
	}

	init = () => {
		this.loadLocationContainers();
		this.loadLocationLinks();
	};

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

			const newClass = isSelected ? this.LINK_SELECTED_CLASS : this.LINK_UNSELECTED_CLASS;
			locationLink.classList.replace(this.LINK_SELECTED_CLASS, newClass);
			locationLink.classList.replace(this.LINK_UNSELECTED_CLASS, newClass);
		});

		this.locationContainers.forEach((locationContainer) => {
			const isShown = locationContainer.classList.contains(this.contentClassName(newName));

			const newClass = isShown ? this.CONTENT_VISIBLE_CLASS : this.CONTENT_HIDDEN_CLASS;
			locationContainer.classList.replace(this.CONTENT_HIDDEN_CLASS, newClass);
			locationContainer.classList.replace(this.CONTENT_VISIBLE_CLASS, newClass);
		});
	};
}
