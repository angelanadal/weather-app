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

currentTime = `${day}, ${hours}:${minutes}`;

let currentTimeText = document.querySelector("#current-time");
currentTimeText.innerHTML = currentTime;

let apiKey = "a8730d7b28118354d14e2046c817ba28";
let units = "metric";

function handleWeatherResponse(response) {
  let temperatureElement = document.querySelector("#current-temp");
  let cityElement = document.querySelector("#current-city");
  let humidityElement = document.querySelector("#current-humidity");
  let windSpeedElement = document.querySelector("#current-wind-speed");
  let feelsLikeElement = document.querySelector("#current-wind-chill");
  let descriptionElement = document.querySelector("#description");

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  humidityElement.innerHTML = `${response.data.main.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed} km/h`;
  feelsLikeElement.innerHTML = `${Math.round(response.data.main.feels_like)}°C`;
  descriptionElement.innerHTML = `${response.data.weather[0].description}`;
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
