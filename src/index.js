import "./styles.css";

let currentTime = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[currentTime.getDay()]; // returns a value between 0 and 6.

let hours = currentTime.getHours();
let minutes = String(currentTime.getMinutes()).padStart(2, "0");

currentTime = `${day} ${hours}:${minutes}`;

let currentTimeText = document.querySelector("#current-time");
currentTimeText.innerHTML = currentTime;

let apiKey = "a8730d7b28118354d14e2046c817ba28";
let units = "metric";
let currentCityName = document.querySelector("#current-city");

function handleWeatherResponse(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = `${temperature}°C`;
  currentCityName.innerHTML = response.data.name;
}

function search(event) {
  event.preventDefault();
  let input = document.querySelector("#city-input");
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&units=${units}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(handleWeatherResponse);
}
let form = document.querySelector("#search-bar");
form.addEventListener("submit", search);

let currentLocationBtn = document.querySelector("#current-loc");
currentLocationBtn.addEventListener("click", (event) => {
  navigator.geolocation.getCurrentPosition((position) => {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
    axios.get(`${apiUrl}&appid=${apiKey}`).then(handleWeatherResponse);
  });
});
