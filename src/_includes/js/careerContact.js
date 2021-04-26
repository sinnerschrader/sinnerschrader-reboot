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

	successfullySent() {
		const forminput = document.querySelector(".form__input");
		const thankyou = document.querySelector(".form__thankyou");
		const remoteHint = document.querySelector(".career-landingpage__remote");

		forminput.classList.add("form__thankyou--hidden");
		remoteHint.classList.add("form__thankyou--hidden");
		thankyou.classList.remove("form__thankyou--hidden");

		document.querySelector(".join-us").scrollIntoView({
			behavior: "smooth",
		});
	}

	sentform(event) {
		event.preventDefault();
		const { name, contact, profile, privacy, email, contactPerson } = event.target;
		const endpoint = "https://7ric1lpsg1.execute-api.eu-central-1.amazonaws.com";
		// We use JSON.stringify here so the data can be sent as a string via HTTP
		const body = JSON.stringify({
			senderName: name.value,
			senderEmail: email.value,
			phonenumber: phonenumber.value,
			profileLink: profile.value,
			privacy: privacy.value,
			contactPerson: contactPerson.value,
		});

		const requestOptions = {
			method: "POST",
			body,
		};

		fetch(endpoint, requestOptions)
			.then((response) => {
				if (!response.ok) throw new Error("Error in fetch ", response);
				this.successfullySent();
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
