const aws = require("aws-sdk");
const ses = new aws.SES({ region: "eu-central-1" });
exports.handler = async function(event) {
    console.log('EVENT: ', event)
        // Extract the properties from the event body
    const { senderEmail, senderName, message } = JSON.parse(event.body)
    const params = {
        Destination: {
            ToAddresses: ["nicole.scherfenberg@sinnerschrader.com"],
        },
        // Interpolate the data in the strings to send
        Message: {
            Body: {
                Text: {
                    Data: `You just got a message from ${senderName} - ${senderEmail}:
            ${message}`
                },
            },
            Subject: { Data: `Message from ${senderName}` },
        },
        Source: "nicole.scherfenberg@sinnerschrader.com",
    };

    return ses.sendEmail(params).promise();
};