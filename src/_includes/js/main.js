import { Slider } from "./slider.js";
import { Locations } from "./locations";
import { BackgroundScrollAnimation } from "./bg-scroll-animation";
import { Video } from "./video.js";
import { OfferingHeader } from "./offering-header";
import { Offerings } from "./offerings";
import { SlideIn } from "./animate-slidein";
import { Parallax } from "./parallax";
import { AnchorNavigation } from "./anchor-navigation";
import { Navigation } from "./navigation";
import { WebGLGrid } from "./webgl-grid";

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

	if (isModuleNeeded("navigation")) {
		new Navigation();
	}

	if (isModuleNeeded("webgl-grid")) {
		new WebGLGrid();
	}

	new Parallax();
})();

function isModuleNeeded(moduleName) {
	return document.querySelectorAll(`[data-js-item='${moduleName}']`).length !== 0;
}
