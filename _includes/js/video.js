class Video {
	constructor() {
		this.init();
	}

	init() {
		this.video = {
			playButton: document.querySelector(".work__video-media-control"),
			videoElement: document.querySelector(".work__video-element"),
		};

		this.bindEvents();
	}

	bindEvents() {
		this.video.playButton.addEventListener("click", this.togglePlay.bind(this));
	}

	togglePlay() {
		this.video.videoElement.paused === true ? this.video.videoElement.play() : this.video.videoElement.pause();
	}
}

export { Video };
