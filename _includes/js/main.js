import { Slider } from "./slider.js";
import { Locations } from "./locations";
import { Video } from "./video.js";
import { OfferingHeader } from "./offering-header";

(() => {
	new Locations();
	new Slider();
	new Video();
	new OfferingHeader();
})();
