// thanks to https://www.freecodecamp.org/news/how-to-receive-emails-via-your-sites-contact-us-form-with-aws-ses-lambda-api-gateway/
const aws = require("aws-sdk");
const ses = new aws.SES({ region: "eu-central-1" });
exports.handler = async function (event) {
	// Extract the properties from the event body
	const { phonenumber, senderName, profileLink, privacy, senderEmail, contactPerson } = JSON.parse(event.body);
	const params = {
		Destination: {
			ToAddresses: ["jobs@sinnerschrader.com"],
			CcAddresses: [senderEmail],
		},
		// Interpolate the data in the strings to send
		Message: {
			Body: {
				Html: {
					Charset: "UTF-8",
					Data: `New message from recuriting landingpage https://sinnerschrader.com/wearehiring.html<br/><br/>
					My name: ${senderName} <br/>
					Email: ${senderEmail}  <br/>
					Phone: ${phonenumber}  <br/>
					Link to my profile: ${profileLink}  <br/>
					I want to speak to: ${contactPerson} <br/>
					Data Privacy: ${privacy} <br/>
					`,
				},
			},
			Subject: {
				Charset: "UTF-8",
				Data: `📮 Recruiting Landingpage: Message from ${senderName}`,
			},
		},
		Source: "jobs@sinnerschrader.com",
	};

	return ses.sendEmail(params).promise();
};
