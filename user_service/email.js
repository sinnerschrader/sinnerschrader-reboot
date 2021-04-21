// thanks to https://www.freecodecamp.org/news/how-to-receive-emails-via-your-sites-contact-us-form-with-aws-ses-lambda-api-gateway/
const aws = require("aws-sdk");
const ses = new aws.SES({ region: "eu-central-1" });
exports.handler = async function (event) {
	console.log("EVENT: ", event);
	// Extract the properties from the event body
	const { contact, senderName, profileLink, privacy, contactPerson } = JSON.parse(event.body);
	const params = {
		Destination: {
			ToAddresses: ["felicitas.kugland@sinnerschrader.com"],
		},
		// Interpolate the data in the strings to send
		Message: {
			Body: {
				Html: {
					Charset: "UTF-8",
					Data: `${senderName} <br/>
					You can best reach me: ${contact}  <br/>
					My profile: ${profileLink}  <br/>
					I want to speak to: ${contactPerson} <br/>
					Data Privacy: ${privacy} <br/>
					`,
				},
			},
			Subject: {
				Charset: "UTF-8",
				Data: `Recruiting Landingpage: Message from ${senderName}`,
			},
		},
		Source: "felicitas.kugland@sinnerschrader.com",
	};

	return ses.sendEmail(params).promise();
};
