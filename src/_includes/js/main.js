import { AnchorNavigation } from "./anchor-navigation";
import { SlideIn } from "./animate-slidein";
import { BackgroundScrollAnimation } from "./bg-scroll-animation";
import { CareerContact } from "./careerContact";
import { ImageTextTeaser } from "./image-text-teaser";
import { FilterList } from "./jobs";
import { InteractiveList } from "./interactiveList";
import { Navigation } from "./navigation";
import { OfferingHeader } from "./offering-header";
import { Offerings } from "./offerings";
import { Parallax } from "./parallax";
import { Slider } from "./slider.js";
import { Video } from "./video.js";

(() => {
	if (isModuleNeeded("locations")) {
		new InteractiveList(".locations");
	}

	if (isModuleNeeded("works")) {
		new InteractiveList(".works");
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

	if (isModuleNeeded("career")) {
		new CareerContact();
	}

	if (isModuleNeeded("image-text-teaser-content")) {
		new ImageTextTeaser();
	}

	if (isModuleNeeded("navigation")) {
		new Navigation();
	}

	if (isModuleNeeded("job-filter-list")) {
		const filterList = new FilterList({
			parentSelector: "#js-filter-list",
			controlsSelector: "#js-job-filter-bar",
			listSelector: "#js-job-listing",
		});
	}

	new Parallax();
})();

function isModuleNeeded(moduleName) {
	return document.querySelectorAll(`[data-js-item='${moduleName}']`).length !== 0;
}
