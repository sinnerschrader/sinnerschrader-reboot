class Video {
	constructor() {
		this.init();
	}

	init() {
		this.videoContainer = document.querySelector(".video-container");

		if (!this.videoContainer) return;

		this.video = {
			previewElement: this.videoContainer.querySelector(".video-preview-loop"),
			reducedMotionElement: this.videoContainer.querySelector(".video-reduced-motion"),
			playButton: this.videoContainer.querySelector(".video-media-control"),
			videoElement: this.videoContainer.querySelector(".video-element"),
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
		this.hidePlayBtn();
	}

	hidePlayBtn() {
		this.video.playButton.classList.add("is-hidden");
	}

	displayVideo() {
		this.video.previewElement.classList.add("is-hidden");
		this.video.reducedMotionElement.classList.add("is-hidden");
		this.video.videoElement.classList.add("is-visible");
		this.video.videoElement.setAttribute("preload", "auto");
	}
}

export { Video };
