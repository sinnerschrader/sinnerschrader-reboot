# User Service

The contactform is triggering a email via AWS API Gateway

## Serverless framework is used

## Test
```
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"senderEmail":"nicole.scherfenberg@sinnerschrader.com","senderName":"nicole","message":"serverless is awesome"}' https://b470bi0mli.execute-api.eu-central-1.amazonaws.com

```
## Todo
change to valid email jobs@sinnerschrader.com


### implement in career-landing.liquid
```
const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  // prevent the form submit from refreshing the page
  event.preventDefault();

  const { name, email, message } = event.target;
  const endpoint =
    "<https://b470bi0mli.execute-api.eu-central-1.amazonaws.com>";
  // We use JSON.stringify here so the data can be sent as a string via HTTP
	const body = JSON.stringify({
    senderName: name.value,
    senderEmail: email.value,
    message: message.value
  });
  const requestOptions = {
    method: "POST",
    body
  };

  fetch(endpoint, requestOptions)
    .then((response) => {
      if (!response.ok) throw new Error("Error in fetch");
      return response.json();
    })
    .then((response) => {
      document.getElementById("result-text").innerText =
        "Email sent successfully!";
    })
    .catch((error) => {
      document.getElementById("result-text").innerText =
        "An unkown error occured.";
    });
});
```