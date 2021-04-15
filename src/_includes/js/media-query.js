/**
 * Adds missing event listener functions to MediaQueryList object (Safari)
 *
 * @param {MediaQueryList} mediaQueryList return value of window.matchMedia
 * @returns {MediaQueryList} a mediaQueryList where it's guaranteed to have addEventListener methods, doesn't polyfill legacy browsers like IE.
 */
const patchMatchMedia = (mediaQueryList) => {
	if ("onchange" in mediaQueryList === false) {
		mediaQueryList.onchange = null;
		mediaQueryList.addEventListener = (_eventType, fn) => {
			mediaQueryList.addListener(fn.bind(mediaQueryList));
		};
		mediaQueryList.removeEventListener = (_eventType, fn) => {
			mediaQueryList.removeListener(fn.bind(mediaQueryList));
		};
	}
	return mediaQueryList;
};

/**
 * Polyfilled wrapper around `window.matchMedia`.
 *
 * @param {string} query a css media query
 * @returns {MediaQueryList} window.matchMedia return value
 */
export function mediaQuery(query) {
	return patchMatchMedia(window.matchMedia(query));
}
