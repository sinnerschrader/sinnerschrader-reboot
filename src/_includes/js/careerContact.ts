export class CareerContact {
	private endpoint = "https://7ric1lpsg1.execute-api.eu-central-1.amazonaws.com";
	private container: HTMLElement;

	public constructor() {
		this.container = document.querySelector(".career-landingpage");

		if (!this.container) {
			return;
		}

		this.intialize();
	}

	private intialize() {
		this.bindEvents();
	}

	private bindEvents() {
		window.addEventListener("submit", this.submitForm.bind(this));
	}

	private successfullySent() {
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

	private submitForm(event) {
		event.preventDefault();

		const { name, profile, phonenumber, privacy, email, contactPerson } = event.target;

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

		fetch(this.endpoint, requestOptions)
			.then((response) => {
				if (!response.ok) {
					throw new Error(`Error in fetch: ${response}`);
				}

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
