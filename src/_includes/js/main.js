import { Slider } from "./slider.js";
import { Locations } from "./locations";
import { BackgroundScrollAnimation } from "./bg-scroll-animation";
import { Video } from "./video.js";
import { OfferingHeader } from "./offering-header";
import { Offerings } from "./offerings";
import { SlideIn } from "./animate-slidein";
import { Parallax } from "./parallax";
import { AnchorNavigation } from "./anchor-navigation";
import { ImageTextTeaser } from "./image-text-teaser";
import { Navigation } from "./navigation";
import { FilterList } from "./jobs";

(() => {
	if (isModuleNeeded("locations")) {
		new Locations();
	}

	if (isModuleNeeded("slider")) {
		new Slider();
	}

	if (isModuleNeeded("bg-scroll-animation")) {
		new BackgroundScrollAnimation();
	}

	if (isModuleNeeded("video")) {
		new Video();
	}

	if (isModuleNeeded("offering-header")) {
		new OfferingHeader();
	}

	if (isModuleNeeded("offerings")) {
		new Offerings();
	}

	if (isModuleNeeded("slide-in")) {
		new SlideIn();
	}

	if (isModuleNeeded("anchor-navigation")) {
		new AnchorNavigation();
	}

	if (isModuleNeeded("image-text-teaser-content")) {
		new ImageTextTeaser();
	}

	if (isModuleNeeded("navigation")) {
		new Navigation();
		
	if (isModuleNeeded("job-filter-list")) {
		const filterList = new FilterList({
			controlsSelector: "#js-job-filter-bar",
			listSelector: "#js-job-listing",
		});
	}

	new Parallax();
})();

function isModuleNeeded(moduleName) {
	return document.querySelectorAll(`[data-js-item='${moduleName}']`).length !== 0;
}
