import { Slider } from "./slider.js";
import { Locations } from "./locations";
import { BackgroundScrollAnimation } from "./bg-scroll-animation";
import { Video } from "./video.js";
import { SlideIn } from "./animate-slidein";

(() => {
	new Locations();
	new Slider();
	new BackgroundScrollAnimation();
	new Video();
	new SlideIn();
})();
