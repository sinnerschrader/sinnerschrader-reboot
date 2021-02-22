import { Slider } from "./slider.js";
import { Locations } from "./locations";
import { BackgroundScrollAnimation } from "./bg-scroll-animation";
import { Video } from "./video.js";
import { OfferingHeader } from "./offering-header";

(() => {
	new Locations();
	new Slider();
	new BackgroundScrollAnimation();
	new Video();
	new OfferingHeader();
})();
