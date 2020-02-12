const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.getElementById("message-1");
const messageTwo = document.getElementById("message-2");

weatherForm.addEventListener("submit", e => {
  e.preventDefault();
  messageOne.innerText = "Loading";
  messageTwo.innerText = "";

  const location = search.value;
  fetch(`http://localhost:3000/weather?address=${location}`)
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        console.log(data.error);
        messageOne.innerText = data.error;
      } else {
        messageOne.innerText = data.location;
        messageTwo.innerText = data.forecast;
      }
    });
});
