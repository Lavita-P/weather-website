//const header = new Headers({Access-Control-Allow-Origin: https://javascript.info});
const weatherForm = document.querySelector("form");
const address = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
//messageOne.textContent = "";
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  fetch(`http://localhost:3000/weather?address=${address.value}`).then(
    (res) => {
      res.json().then((data) => {
        if (data.error) messageOne.textContent = data.error;
        else {
          messageOne.textContent = data.location;
          messageTwo.textContent = data.forecast;
        }
      });
    }
  );
});
