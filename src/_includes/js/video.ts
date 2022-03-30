class Video {
	private videoContainer: HTMLElement;
	private previewElement: HTMLElement;
	private reducedMotionElement: HTMLElement;
	private playButton: HTMLElement;
	private videoElement: HTMLVideoElement;

	public constructor() {
		this.init();
	}

	private init() {
		this.videoContainer = document.querySelector(".video-container");

		if (!this.videoContainer) return;

		this.previewElement = this.videoContainer.querySelector(".video-preview-loop");
		this.reducedMotionElement = this.videoContainer.querySelector(".video-reduced-motion");
		this.playButton = this.videoContainer.querySelector(".video-media-control");
		this.videoElement = this.videoContainer.querySelector(".video-element");

		this.bindEvents();
	}

	private bindEvents() {
		this.playButton.addEventListener("click", this.togglePlay.bind(this));
	}

	private togglePlay() {
		const videoPreloadAttr = this.videoElement.getAttribute("preload");

		if (videoPreloadAttr === "none") {
			this.displayVideo();
		}

		if (this.videoElement.paused === true) {
			this.videoElement.play();
			this.videoElement.focus();
		} else {
			this.videoElement.pause();
		}

		this.hidePlayBtn();
	}

	private hidePlayBtn() {
		this.playButton.classList.add("is-hidden");
	}

	private displayVideo() {
		this.previewElement.classList.add("is-hidden");
		this.reducedMotionElement.classList.add("is-hidden");
		this.videoElement.classList.add("is-visible");
		this.videoElement.setAttribute("preload", "auto");
	}
}

export { Video };
