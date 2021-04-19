// thanks to https://www.freecodecamp.org/news/how-to-receive-emails-via-your-sites-contact-us-form-with-aws-ses-lambda-api-gateway/
const aws = require("aws-sdk");
const ses = new aws.SES({ region: "eu-central-1" });
exports.handler = async function (event) {
	console.log("EVENT: ", event);
	// Extract the properties from the event body
	const { senderEmail, senderName, message } = JSON.parse(event.body);
	const params = {
		Destination: {
			ToAddresses: ["felicitas.kugland@sinnerschrader.com"],
		},
		// Interpolate the data in the strings to send
		Message: {
			Body: {
				Text: {
					Data: `You just got a message from ${senderName} - ${senderEmail}:
            ${message}`,
				},
			},
			Subject: { Data: `Message from ${senderName}` },
		},
		Source: "felicitas.kugland@sinnerschrader.com",
	};

	return ses.sendEmail(params).promise();
};
