class BackgroundScrollAnimation {
	animationStartElement = {};
	animationEndElement = {};
	bgIsDark = false;

	constructor() {
		this.init();
	}

	init() {
		this.animationStartElement = document.querySelectorAll('[data-js-item="bg-animation-to-black-start"]');
		this.animationEndElement = document.querySelectorAll('[data-js-item="bg-animation-to-black-end"]');

		console.log(this.animationStartElement, this.animationEndElement);

		this.bindEvents();
	}

	bindEvents() {
		document.addEventListener("scroll", this.scrollHandler.bind(this));
	}

	scrollHandler() {
		let lastKnownScrollPosition = window.scrollY;
		let ticking;

		if (!ticking) {
			window.requestAnimationFrame(() => {
				this.viewPortDetection(lastKnownScrollPosition);
				ticking = false;
			});

			ticking = true;
		}
	}

	viewPortDetection(scroll) {
		console.log("Someone is scrolling", scroll);
	}

	/*!
	 * Determine if an element is in the viewport
	 * (c) 2017 Chris Ferdinandi, MIT License, https://gomakethings.com
	 * @param  {Node}    elem The element
	 * @return {Boolean}      Returns true if element is in the viewport
	 */
	isInViewport(elem) {
		let distance = elem.getBoundingClientRect();
		return (
			distance.top >= 0 &&
			distance.left >= 0 &&
			distance.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
			distance.right <= (window.innerWidth || document.documentElement.clientWidth)
		);
	}
}

export { BackgroundScrollAnimation };
