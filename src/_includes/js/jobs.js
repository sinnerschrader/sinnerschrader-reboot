export class FilterList {
	// Reference to parent element
	parent;
	// Filter inputs container
	controls;
	// the job list
	list;
	// filter Object gets filled depending on content
	filters = {};

	// CSS constants
	hiddenClass = "hidden";

	constructor(props) {
		// parent container
		this.parent = document.querySelector(props.parentSelector);
		// inputs
		this.controls = document.querySelector(props.controlsSelector);
		// output
		this.list = document.querySelector(props.listSelector);

		if (this.parent === null || this.controls === null || this.list === null) {
			console.warn("No DOM elements found");
			return;
		}

		// apply Eventlisteners
		this.bindListeners();
		this.createFilters();
	}

	// UI Events
	bindListeners() {
		// Filter Selection
		this.controls.querySelectorAll('input[type="checkbox"]').forEach((item) => {
			item.addEventListener("change", (evt) => {
				// filter category
				const filter = evt.target.getAttribute("name");
				// filter value
				const value = evt.target.getAttribute("value");
				if (evt.target.checked) {
					// adds filter value
					this.filters[filter].push(value);
				} else {
					// removes filter value
					const index = this.filters[filter].indexOf(value);
					this.filters[filter].splice(index, 1);
				}
				this.updateActiveFilterTags();
				this.updateList();
				this.updateListCategories();
			});
		});

		// Toggle Menu / Desktop
		this.controls.querySelector("#js-toggle-filter-bar").addEventListener("click", (evt) => {
			evt.preventDefault();
			this.toggleFilterBarOpen();
		});

		// Toggle Menu / Mobile
		this.parent.querySelectorAll(".js-toggle-filter-bar--mobile").forEach((elem) => {
			elem.addEventListener("click", (evt) => {
				evt.preventDefault();
				this.toggleFilterBarOpen();
				// Full screen menu open so prevent scrolling in the background
				document.body.classList.toggle("freeze-scroll");
			});
		});

		// Apply Filters
		this.controls.querySelector("#js-apply-filter").addEventListener("click", (evt) => {
			evt.preventDefault();
			this.updateList();
			this.updateListCategories();
			this.toggleFilterBarOpen();
			if (document.body.classList.contains("freeze-scroll")) {
				document.body.classList.remove("freeze-scroll");
			}
		});

		// Clear Filters
		this.controls.querySelector("#js-clear-filter").addEventListener("click", (evt) => {
			evt.preventDefault();
			// Reset filter value arrays
			Object.keys(this.filters).forEach((category) => {
				this.filters[category] = [];
			});

			// reset inputs
			this.controls.querySelectorAll('input[type="checkbox"]').forEach((input) => {
				input.checked = false;
			});

			// update Labels
			this.updateActiveFilterTags();

			// update List
			this.updateList();
			this.updateListCategories();
		});
	}

	// open close the filter bar
	toggleFilterBarOpen() {
		this.controls.classList.toggle("is-open");
	}

	// Loops through HTML Categories in the filter section and creates an filter object
	createFilters() {
		if (!this.controls) return;
		this.controls.querySelectorAll(".job-filter-bar__category").forEach((item) => {
			const category = item.dataset.category;
			if (category) {
				this.filters[category] = [];
			}
		});
	}

	// for a specific filter section return if a filter is set
	isFilterActive(filter) {
		return this.filters[filter].length !== 0;
	}

	// reset all items
	setAllActive() {
		this.list.querySelectorAll("li").forEach((item) => {
			item.classList.remove(this.hiddenClass);
			item.classList.remove("is-last");
		});
	}

	// Update the labels with currently selected filter values
	updateActiveFilterTags() {
		// updates mobile active labels
		const mobileTags = Object.values(this.filters).flatMap((x) => x);
		const activeMobileKeyWords = mobileTags.length !== 0 ? mobileTags.join(", ") : "All";
		this.controls.querySelectorAll(".mobile-active-filters").forEach((elem) => {
			elem.innerHTML = activeMobileKeyWords;
		});

		// updates filter group labels
		Object.keys(this.filters).forEach((category) => {
			const activeKeyWord = this.filters[category].length !== 0 ? this.filters[category].join(", ") : "All";
			this.controls.querySelector(`#js-active-filters--${category}`).innerHTML = activeKeyWord;
		});
	}

	// Update Categories
	updateListCategories() {
		const categories = this.list.querySelectorAll(".job-list__category");

		// Hiding and Showing discipline categories
		categories.forEach((categoryElement) => {
			const itemsInCategory = Array.from(categoryElement.querySelectorAll("li"));

			// filter out hidden elements ...
			const remainingElements = itemsInCategory.filter((item) => {
				return !item.classList.contains(this.hiddenClass);
			});

			// last remaining item must not have a border
			if (remainingElements[remainingElements.length - 1]) {
				remainingElements[remainingElements.length - 1].classList.add("is-last");
			}

			// ... and if there are no remainers hide the whole category
			if (remainingElements.length === 0) {
				categoryElement.classList.add(this.hiddenClass);
			} else {
				categoryElement.classList.remove(this.hiddenClass);
			}
		});
	}

	// Update Job list
	updateList() {
		// first reset all
		this.setAllActive();

		// Filter items and add hidden class
		Array.from(this.list.querySelectorAll("li"))
			// by discipline
			.filter((item) => {
				const discipline = item.dataset.discipline;
				const level = item.dataset.level;
				const location = item.dataset.location;
				const excluded =
					// discipline doesn't match and discipline section is active
					(!this.filters["discipline"].includes(discipline) && this.isFilterActive("discipline")) ||
					// location doesn't match and location section is active
					(!this.filters["location"].includes(location) && this.isFilterActive("location"));
				// all excluded ones are treated with an extra class
				return excluded;
			})
			// applies hidden class for all excluded ones
			.forEach((item, index, self) => {
				item.classList.add(this.hiddenClass);
			});
	}
}

export class FloatObserver {
	objective;
	target;
	targetClass = "";
	observer;

	constructor(props) {
		this.objective = document.querySelector(props.objectiveSelector);
		this.target = document.querySelector(props.targetSelector);
		this.targetClass = props.targetClass;

		if (this.objective === null || this.target === null) {
			console.warn("No DOM elements found!");
			return;
		}

		this.bindListeners();
	}

	bindListeners() {
		this.observer = new IntersectionObserver((changes) => {
			if (changes[0].isIntersecting) {
				this.target.classList.remove(this.targetClass);
			} else {
				this.target.classList.add(this.targetClass);
			}
		});
		this.observer.observe(this.objective);
	}
}
