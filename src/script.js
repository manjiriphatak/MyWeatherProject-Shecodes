//code to display date-begins

let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thurday",
  "Friday",
  "Saturday",
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
let date = now.getDate();
let day = days[now.getDay()];
let year = now.getFullYear();
let time = now.getHours();
let minutes = now.getMinutes();
let updateDate = document.querySelector("#todaysdate");
let displayDate = `${day}, ${date} ${month}, ${year}, ${time}:${minutes}`;
updateDate.innerHTML = displayDate;

function formatTime(timestamp) {
  let time = new Date(timestamp);
  let hours = time.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function handlePosition(position) {
  console.log(position);
  let showLatitude = position.coords.latitude;
  let showLongitude = position.coords.longitude;
  let apiKey = "b433aea7f2b3444f708346b87eb93b9d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${showLatitude}&lon=${showLongitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getLocalTemperature);
}

function getLocalTemperature(response) {
  let localCity = response.data.name;
  localCity = localCity.toUpperCase();
  let displayLocalCity = document.querySelector("#city-display");
  displayLocalCity.innerHTML = localCity;

  showTemp(response);
}

function showTemp(response) {
  console.log(response);
  celsiusTemperature = Math.round(response.data.main.temp);
  let temperatureDisplay = document.querySelector("#current-temp");
  temperatureDisplay.innerHTML = `${celsiusTemperature}`;

  let descriptionSection = document.querySelector("#description");
  descriptionSection.innerHTML = response.data.weather[0].description;

  let feelsLike = document.querySelector("#feels-like");
  feelsLikeTemp = Math.round(response.data.main.feels_like);
  feelsLike.innerHTML = `Feels Like ${feelsLikeTemp}°C`;

  let humidity = document.querySelector("#humidity");
  let showHumidity = response.data.main.humidity;
  humidity.innerHTML = `${showHumidity}%`;

  let wind = document.querySelector("#wind");
  showWind = Math.round(response.data.wind.speed * 3.6);
  wind.innerHTML = `${showWind} Km/Hr`;

  let sunrise = document.querySelector("#sunrise-time");
  let sunriseTime = formatTime(response.data.sys.sunrise * 1000);
  sunrise.innerHTML = sunriseTime;

  let sunset = document.querySelector("#sunset-time");
  let sunsetTime = formatTime(response.data.sys.sunset * 1000);
  sunset.innerHTML = sunsetTime;
}
function convertToFahren(event) {
  event.preventDefault();
  celsiusTemp.classList.remove("active");
  fahrenTemp.classList.add("active");
  let displayTemperature = document.querySelector("#current-temp");
  let fahTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
  let feelsLike = document.querySelector("#feels-like");
  let feelsLikeTempF = Math.round((feelsLikeTemp * 9) / 5 + 32);
  let wind = document.querySelector("#wind");
  let showWindSpeed = Math.round(showWind / 1.609);

  displayTemperature.innerHTML = `${fahTemperature}`;
  feelsLike.innerHTML = `Feels Like ${feelsLikeTempF}°F`;
  wind.innerHTML = `${showWindSpeed} Miles/Hr`;
}

function convertToCelsius(event) {
  event.preventDefault();
  celsiusTemp.classList.add("active");
  fahrenTemp.classList.remove("active");
  let displayTemperature = document.querySelector("#current-temp");
  let feelsLike = document.querySelector("#feels-like");
  let wind = document.querySelector("#wind");

  displayTemperature.innerHTML = `${celsiusTemperature}`;
  feelsLike.innerHTML = `Feels Like ${feelsLikeTemp}°C`;
  wind.innerHTML = `${showWind} Km/Hr`;
}

function city(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#city-text-input");
  let cityDisplay = document.querySelector("#city-display");
  let city = citySearch.value;
  city = city.toUpperCase();
  cityDisplay.innerHTML = city;

  let apiKey = "b433aea7f2b3444f708346b87eb93b9d";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch.value}&appid=${apiKey}&units=${unit}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showTemp);
}

function showCurrentLocationWeather() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let celsiusTemperature = null;
let feelsLikeTemp = null;
let showWind = null;

let form = document.querySelector("#city-entered");
form.addEventListener("submit", city);

let currentLocationWeather = document.querySelector("#current-location-icon");
currentLocationWeather.addEventListener("click", showCurrentLocationWeather);

let fahrenTemp = document.querySelector("#fahrenheit");
fahrenTemp.addEventListener("click", convertToFahren);

let celsiusTemp = document.querySelector("#celsius");
celsiusTemp.addEventListener("click", convertToCelsius);

showCurrentLocationWeather();
