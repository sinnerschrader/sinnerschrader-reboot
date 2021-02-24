export class Locations {
	data = {};

	BUTTON_NAME = "locations__navigation-button";
	CONTENT_NAME = "locations__content";

	CONTENT_HIDDEN_CLASS = this.CONTENT_NAME + "--hidden";
	BUTTON_SELECTED_CLASS = this.BUTTON_NAME + "--selected";

	locationContainers = [];
	locationButtons = [];
	locationIndicator;

	timeouts = [];

	constructor() {
		fetch("./data/locations.json")
			.then((response) => response.json())
			.then((json) => this.init(json))
			.catch((error) => console.error("Couldn't fetch locations data: " + error));
	}

	init = (jsonData) => {
		this.data = jsonData;

		this.loadLocationContainers();
		this.loadLocationButtons();
		this.loadLocationIndicator();
		this.renderSelectedLocation(this.data[0].name);
	};

	linkId = (locationName) => `${this.BUTTON_NAME}-${locationName}`;
	contentClassName = (locationName) => `${this.CONTENT_NAME}-${locationName}`;

	loadLocationIndicator = () => {
		this.locationIndicator = document.getElementById("locations__navigation-indicator");
	};

	loadLocationButtons = () => {
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

	viewPortByMediaQuery = (query) => {
		switch (query) {
			case "(max-width: 599px)":
				return "mobile";
			case "(min-width: 600px) and (max-width: 1199px)":
				return "tablet";
			case "(min-width: 1200px)":
			default:
				return "desktop";
		}
	};

	renderLocationButtons = (newButtonId) => {
		this.locationButtons.forEach((button) => {
			if (!button) return;

			const isSelected = button.id === newButtonId;

			if (isSelected) {
				this.locationIndicator.style.top = button.offsetTop + button.clientHeight / 2 + "px";
				button.classList.add(this.BUTTON_SELECTED_CLASS);
			} else {
				button.classList.remove(this.BUTTON_SELECTED_CLASS);
			}
		});
	};

	setPictureSrc = (container, isShown, { imageLarge, imageSmall }) => {
		const picture = container.querySelector("picture");
		if (!picture) {
			return;
		}

		const sources = picture.querySelectorAll("source");
		const img = picture.querySelector("img");

		if (isShown && !img.getAttribute("src")) {
			const isBigImage = container.classList.contains("locations__image-wrapper-large");
			const imageName = isBigImage ? imageLarge : imageSmall;
			const fallbackName = imageName.split(".").slice(0, -1).join(".") + ".jpg";

			img.setAttribute("src", `./assets/images/fallback/${fallbackName}`);

			sources.forEach((source) => {
				const viewport = this.viewPortByMediaQuery(source.media);
				source.setAttribute("srcset", `./assets/images/${viewport}/${imageName}`);
			});
		}
	};

	renderLocationContainers = (newLocationData) => {
		this.timeouts = this.timeouts.map(clearTimeout);

		this.locationContainers.forEach((container) => {
			if (!container) return;

			const shownClassName = this.contentClassName(newLocationData.name);
			const isShown = container.classList.contains(shownClassName);

			this.setPictureSrc(container, isShown, newLocationData);

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

			this.timeouts.push(setTimeout(animationCallback, 200));
		});
	};

	renderSelectedLocation = (newName) => {
		const newButtonId = this.linkId(newName);
		this.renderLocationButtons(newButtonId);

		const newLocationData = this.data.find((location) => location.name === newName);
		this.renderLocationContainers(newLocationData);
	};
}
