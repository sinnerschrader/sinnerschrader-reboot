const AWS = require("aws-sdk");
const axios = require("axios");
AWS.config.update({ region: "eu-central-1" });
const ses = new AWS.SES({ region: "eu-central-1" });

const CONTACT_TYPES = {
	FULL: "full",
	ONLY_HANDLE: "only_handle",
};

const TARGET_EMAIL = process.env.TARGET_EMAIL;
const SOURCE_EMAIL = process.env.SOURCE_EMAIL;

const handleFullContact = (event) => {
	const { phonenumber, senderName, profileLink, privacy, senderEmail, contactPerson } = event.payload;
	const params = {
		Destination: {
			ToAddresses: [TARGET_EMAIL],
			CcAddresses: [senderEmail],
		},
		// Interpolate the data in the strings to send
		Message: {
			Body: {
				Html: {
					Charset: "UTF-8",
					Data: `New message from recruiting landing page https://sinnerschrader.com/jobs.html<br/><br/>
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
				Data: `📮 Recruiting Landing page: Message from ${senderName}`,
			},
		},
		Source: SOURCE_EMAIL,
	};

	return ses.sendEmail(params).promise();
};

const handleProfileLinkContact = async (data) => {
	const { handle } = data.payload;

	const params = {
		Destination: {
			ToAddresses: [TARGET_EMAIL],
		},
		Message: {
			Body: {
				Html: {
					Charset: "UTF-8",
					Data: `New profile handle left for you from https://sinnerschrader.com/jobs.html<br/><br/>handle: ${handle} <br/>`,
				},
			},
			Subject: {
				Charset: "UTF-8",
				Data: `📮 Recruiting Landing page: New talent radar handle ${handle}`,
			},
		},
		Source: SOURCE_EMAIL,
		SourceArn: process.env.SOURCE_EMAIL_ARN,
	};

	try {
		await ses.sendEmail(params).promise();
		return { statusCode: 200, body: JSON.stringify({ success: true, message: "OK" }) };
	} catch (e) {
		return { statusCode: 500, body: JSON.stringify({ success: false, message: "Something went wrong." }) };
	}
};

const isCaptchaValid = async (captchaId) => {
	try {
		const params = new URLSearchParams();
		params.append("secret", process.env.HCAPTCHA_SECRET);
		params.append("response", captchaId);
		const response = await axios.post("https://hcaptcha.com/siteverify", params, {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
			},
		});
		return response.data;
	} catch (e) {
		return { success: false, error: e.message };
	}
};

exports.handler = async (event) => {
	const body = JSON.parse(event.body);
	const type = body.type;
	const captchaId = body.captcha;

	if (!Object.values(CONTACT_TYPES).includes(type))
		return {
			statusCode: 400,
			body: JSON.stringify({ success: false, message: `Forbidden value of 'type' parameter: ${type}` }),
		};

	const captchaResponse = await isCaptchaValid(captchaId);
	if (!captchaResponse.success)
		return {
			statusCode: 400,
			body: JSON.stringify({ success: false, message: `Captcha is not valid. ${JSON.stringify(captchaResponse)}` }),
		};

	if (type === CONTACT_TYPES.FULL) return handleFullContact(body);

	if (type === CONTACT_TYPES.ONLY_HANDLE) {
		return await handleProfileLinkContact(body);
	}
};
