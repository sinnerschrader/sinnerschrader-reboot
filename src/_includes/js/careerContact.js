export class CareerContact {
	constructor() {
		this.container = document.querySelector(".career-landingpage");
		if (!this.container) return;
		this.intialize();
	}

	intialize() {
		this.bindEvents();
	}

	bindEvents() {
		window.addEventListener("submit", this.sentform.bind(this));
	}

	sentform(event) {
		event.preventDefault();
		const { name, contact, profile } = event.target;
		const endpoint = "https://xr9bha0zvh.execute-api.eu-central-1.amazonaws.com";
		// We use JSON.stringify here so the data can be sent as a string via HTTP
		const body = JSON.stringify({
			senderName: name.value,
			senderEmail: contact.value,
			message: profile.value,
		});

		const requestOptions = {
			method: "POST",
			body,
		};

		fetch(endpoint, requestOptions)
			.then((response) => {
				if (!response.ok) throw new Error("Error in fetch");
				return response.json();
			})
			.then((response) => {
				console.log("Email sent successfully! ", response);
			})
			.catch((error) => {
				console.log("An unkown error occured. ", error);
			});
	}
}
