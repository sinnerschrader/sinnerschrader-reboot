export const waitForInitialPaint = () => {
	let counter = 0;

	return new Promise((res, rej) => {
		const interval = setInterval(() => {
			if (document.getElementsByTagName("body").length > 0) {
				res();
				clearInterval(interval);
			}

			if (counter > 1000) {
				console.error("!!! couldn't init Locations module !!!");
				rej();
			}

			counter++;
		}, 100);
	});
};
