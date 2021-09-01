const simpleOauthModule = require("simple-oauth2");
const randomstring = require("randomstring");

const secrets = {
	GIT_HOSTNAME: "https://github.com",
	OAUTH_TOKEN_PATH: "/login/oauth/access_token",
	OAUTH_AUTHORIZE_PATH: "/login/oauth/authorize",
	OAUTH_CLIENT_ID: process.env.OAUTH_CLIENT_ID,
	OAUTH_CLIENT_SECRET: process.env.OAUTH_CLIENT_SECRET,
	REDIRECT_URL: "https://k741x3mcij.execute-api.eu-central-1.amazonaws.com/prod/callback",
	OAUTH_SCOPES: "repo,user",
};

function getScript(mess, content) {
	return `<html><body><script>
  (function() {
    function receiveMessage(e) {
      console.log("receiveMessage %o", e)
      window.opener.postMessage(
        'authorization:github:${mess}:${JSON.stringify(content)}',
        e.origin
      )
      window.removeEventListener("message",receiveMessage,false);
    }
    window.addEventListener("message", receiveMessage, false)
    console.log("Sending message: %o", "github")
    window.opener.postMessage("authorizing:github", "*")
    })()
  </script></body></html>`;
}

module.exports.auth = (e, ctx, cb) => {
	const oauth2 = simpleOauthModule.create({
		client: {
			id: secrets.OAUTH_CLIENT_ID,
			secret: secrets.OAUTH_CLIENT_SECRET,
		},
		auth: {
			tokenHost: secrets.GIT_HOSTNAME,
			tokenPath: secrets.OAUTH_TOKEN_PATH,
			authorizePath: secrets.OAUTH_AUTHORIZE_PATH,
		},
	});

	// Authorization uri definition
	const authorizationUri = oauth2.authorizationCode.authorizeURL({
		redirect_uri: secrets.REDIRECT_URL,
		scope: secrets.OAUTH_SCOPES,
		state: randomstring.generate(32),
	});

	cb(null, {
		statusCode: 302,
		headers: {
			Location: authorizationUri,
		},
	});
};

module.exports.callback = (e, ctx, cb) => {
	let oauth2;
	Promise.resolve()
		.then(() => {
			oauth2 = simpleOauthModule.create({
				client: {
					id: secrets.OAUTH_CLIENT_ID,
					secret: secrets.OAUTH_CLIENT_SECRET,
				},
				auth: {
					tokenHost: secrets.GIT_HOSTNAME,
					tokenPath: secrets.OAUTH_TOKEN_PATH,
					authorizePath: secrets.OAUTH_AUTHORIZE_PATH,
				},
			});

			const options = {
				code: e.queryStringParameters.code,
			};
			return oauth2.authorizationCode.getToken(options);
		})
		.then((result) => {
			const token = oauth2.accessToken.create(result);
			cb(null, {
				statusCode: 200,
				headers: {
					"Content-Type": "text/html",
				},
				body: getScript("success", {
					token: token.token.access_token,
					provider: "github",
				}),
			});
		})
		.catch((err) => {
			cb(null, {
				statusCode: 200,
				headers: {
					"Content-Type": "text/html",
				},
				body: getScript("error", err),
			});
		});
};
