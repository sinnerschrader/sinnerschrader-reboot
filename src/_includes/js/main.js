import { AnchorNavigation } from "./anchor-navigation";
import { SlideIn } from "./animate-slidein";
import { BackgroundScrollAnimation } from "./bg-scroll-animation";
import { CareerContact } from "./careerContact";
import { FilterList } from "./jobs";
import { Locations } from "./locations";
import { Navigation } from "./navigation";
import { OfferingHeader } from "./offering-header";
import { Offerings } from "./offerings";
import { Parallax } from "./parallax";
<<<<<<< HEAD
import { ProfileLinkContactForm } from "./profile-link-contact-form";
import { ShareButtons } from "./share-buttons";
import { Slider } from "./slider.js";
import { Video } from "./video.js";
=======
import { AnchorNavigation } from "./anchor-navigation";
import { CareerContact } from "./careerContact";
import { ImageTextTeaser } from "./image-text-teaser";
import { Navigation } from "./navigation";
import { FilterList, FloatObserver } from "./jobs";
>>>>>>> c6ec30b (Feat/jobs list page (#200))

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

	if (isModuleNeeded("career")) {
		new CareerContact();
	}

	if (isModuleNeeded("profile-link-contact-form-content")) {
		new ProfileLinkContactForm();
	}

	if (isModuleNeeded("navigation")) {
		new Navigation();
	}

	if (isModuleNeeded("job-filter-list")) {
<<<<<<< HEAD
		new FilterList({
			parentSelector: "#js-filter-list",
			controlsSelector: "#js-job-filter-bar",
			listSelector: "#js-job-listing",
			liveUpdate: true,
		});
	}

	if (isModuleNeeded("share-buttons")) {
		new ShareButtons();
	}

=======
		const filterList = new FilterList({
			parentSelector: "#js-filter-list",
			controlsSelector: "#js-job-filter-bar",
			listSelector: "#js-job-listing",
		});

		const floatObserver = new FloatObserver({
			objectiveSelector: "#js-mobile-filter-header",
			targetSelector: "#js-job-filter-bar",
			targetClass: "is-floating",
		});
	}

>>>>>>> c6ec30b (Feat/jobs list page (#200))
	new Parallax();
})();

function isModuleNeeded(moduleName) {
	return document.querySelectorAll(`[data-js-item='${moduleName}']`).length !== 0;
}
