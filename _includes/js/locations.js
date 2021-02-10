import { waitForInitialPaint } from "./utils";

export class Locations {
	data = LOCATION_DATA;

	LINK_NAME = "location-link";
	CONTAINER_NAME = "location";

	locationContainers = [];
	locationLinks = [];

	constructor() {
		console.log("... init Locations module ...");
		waitForInitialPaint().then(this.init);
	}

	init = () => {
		this.loadLocationContainers();
		this.loadLocationLinks();

		this.attachEventListeners();
	};

	attachEventListeners = () => {
		this.locationLinks.forEach(
			(locationLink, index) => locationLink && locationLink.addEventListener("click", this.renderSelectedLocation(index))
		);
	};

	loadLocationLinks = () => {
		this.locationLinks = this.data.map((_, index) => document.getElementById(`${this.LINK_NAME}-${index}`));
	};

	loadLocationContainers = () => {
		this.locationContainers = this.data
			.map((_, index) => document.getElementsByClassName(`${this.CONTAINER_NAME}-${index}`))
			.reduce((acc, current) => [...acc, ...current], []);
	};

	renderSelectedLocation = (newIndex) => () => {
		this.locationContainers.forEach((locationContainer) => {
			const isShown = locationContainer.classList.contains(`${this.CONTAINER_NAME}-${newIndex}`);

			locationContainer.style.display = isShown ? "unset" : "none";
		});
	};
}
