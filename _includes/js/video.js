class Video {
	constructor() {
		this.init();
	}

	init() {
		this.video = {
			previewElement: document.querySelector(".work__video-preview-loop"),
			playButton: document.querySelector(".work__video-media-control"),
			videoElement: document.querySelector(".work__video-element"),
		};

		this.bindEvents();
	}

	bindEvents() {
		this.video.playButton.addEventListener("click", this.togglePlay.bind(this));
	}

	togglePlay() {
		const videoPreloadAttr = this.video.videoElement.getAttribute("preload");

		if (videoPreloadAttr === "none") {
			this.displayVideo();
		}

		this.video.videoElement.paused === true ? this.video.videoElement.play() : this.video.videoElement.pause();
		this.video.playButton.classList.toggle("is-playing");
	}

	displayVideo() {
		this.video.previewElement.classList.add("is-hidden");
		this.video.videoElement.classList.add("is-visible");
		this.video.videoElement.setAttribute("preload", "auto");

		if (this.isTouchDevice()) {
			this.fullscreenOnMobile();
		}
	}

	fullscreenOnMobile() {
		this.video.videoElement.requestFullscreen().error("Request to go in fullscreen unsuccessful");
	}

	isTouchDevice() {
		return "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
	}
}

export { Video };
