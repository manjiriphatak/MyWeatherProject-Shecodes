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

//code to display date-ends
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

//code to display local weather (home page) starts
function getLocalTemperature(response) {
  console.log(response);
  let localCity = response.data.name;
  localCity = localCity.toUpperCase();
  let displayLocalCity = document.querySelector("#city-display");
  displayLocalCity.innerHTML = localCity;

  let temperature = Math.round(response.data.main.temp);
  console.log(response);
  console.log(temperature);
  let temperatureDisplay = document.querySelector("#current-temp");
  temperatureDisplay.innerHTML = `${temperature}°C`;

  let fahrenTemp = document.querySelector("#fahrenheit");
  fahrenTemp.addEventListener("click", function convertToFahren() {
    let fahTemperature = Math.round((temperature * 9) / 5 + 32);
    let displayTemperature = document.querySelector("#current-temp");
    displayTemperature.innerHTML = `${fahTemperature}°F`;
    let feelsLike = document.querySelector("#feels-like");
    let feelsLikeTemp = Math.round(
      (response.data.main.feels_like * 9) / 5 + 32
    );
    feelsLike.innerHTML = `Feels Like ${feelsLikeTemp}°F`;
    let wind = document.querySelector("#wind");
    let showWind = Math.round(response.data.wind.speed * 2.237);
    wind.innerHTML = `${showWind} Miles/Hr`;
  });

  let celsiusTemp = document.querySelector("#celsius");
  celsiusTemp.addEventListener("click", function convertToCelsius() {
    let displayTemperature = document.querySelector("#current-temp");
    displayTemperature.innerHTML = `${temperature}°C`;
    let feelsLike = document.querySelector("#feels-like");
    let feelsLikeTemp = Math.round(response.data.main.feels_like);
    feelsLike.innerHTML = `Feels Like ${feelsLikeTemp}°C`;
    let wind = document.querySelector("#wind");
    let showWind = Math.round(response.data.wind.speed * 3.6);
    wind.innerHTML = `${showWind} Km/Hr`;
  });

  let descriptionSection = document.querySelector("#description");
  descriptionSection.innerHTML = response.data.weather[0].description;

  let feelsLike = document.querySelector("#feels-like");
  let feelsLikeTemp = Math.round(response.data.main.feels_like);
  feelsLike.innerHTML = `Feels Like ${feelsLikeTemp}°C`;

  let humidity = document.querySelector("#humidity");
  let showHumidity = response.data.main.humidity;
  humidity.innerHTML = `${showHumidity}%`;

  let wind = document.querySelector("#wind");
  let showWind = Math.round(response.data.wind.speed * 3.6);
  wind.innerHTML = `${showWind} Km/Hr`;

  let sunrise = document.querySelector("#sunrise-time");
  let sunriseTime = formatTime(response.data.sys.sunrise * 1000);
  sunrise.innerHTML = sunriseTime;

  let sunset = document.querySelector("#sunset-time");
  let sunsetTime = formatTime(response.data.sys.sunset * 1000);
  sunset.innerHTML = sunsetTime;
}

function handlePosition(position) {
  console.log(position);
  let showLatitude = position.coords.latitude;
  let showLongitude = position.coords.longitude;
  let apiKey = "b433aea7f2b3444f708346b87eb93b9d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${showLatitude}&lon=${showLongitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getLocalTemperature);
}
navigator.geolocation.getCurrentPosition(handlePosition);

//code to display local weather (home page) ends

//code to display searched city weather starts

function showTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  console.log(response);
  console.log(temperature);
  let temperatureDisplay = document.querySelector("#current-temp");
  temperatureDisplay.innerHTML = `${temperature}°C`;

  let fahrenTemp = document.querySelector("#fahrenheit");
  fahrenTemp.addEventListener("click", function convertToFahren() {
    let fahTemperature = Math.round((temperature * 9) / 5 + 32);
    let displayTemperature = document.querySelector("#current-temp");
    displayTemperature.innerHTML = `${fahTemperature}°F`;
    let feelsLike = document.querySelector("#feels-like");
    let feelsLikeTemp = Math.round(
      (response.data.main.feels_like * 9) / 5 + 32
    );
    feelsLike.innerHTML = `Feels Like ${feelsLikeTemp}°F`;
    let wind = document.querySelector("#wind");
    let showWind = Math.round(response.data.wind.speed * 2.237);
    wind.innerHTML = `${showWind} Miles/Hr`;
  });

  let celsiusTemp = document.querySelector("#celsius");
  celsiusTemp.addEventListener("click", function convertToCelsius() {
    let displayTemperature = document.querySelector("#current-temp");
    displayTemperature.innerHTML = `${temperature}°C`;
    let feelsLike = document.querySelector("#feels-like");
    let feelsLikeTemp = Math.round(response.data.main.feels_like);
    feelsLike.innerHTML = `Feels Like ${feelsLikeTemp}°C`;
    let wind = document.querySelector("#wind");
    let showWind = Math.round(response.data.wind.speed * 3.6);
    wind.innerHTML = `${showWind} Km/Hr`;
  });

  let descriptionSection = document.querySelector("#description");
  descriptionSection.innerHTML = response.data.weather[0].description;

  let feelsLike = document.querySelector("#feels-like");
  let feelsLikeTemp = Math.round(response.data.main.feels_like);
  feelsLike.innerHTML = `Feels Like ${feelsLikeTemp}°C`;

  let humidity = document.querySelector("#humidity");
  let showHumidity = response.data.main.humidity;
  humidity.innerHTML = `${showHumidity}%`;

  let wind = document.querySelector("#wind");
  let showWind = Math.round(response.data.wind.speed * 3.6);
  wind.innerHTML = `${showWind} Km/Hr`;

  let sunrise = document.querySelector("#sunrise-time");
  let sunriseTime = formatTime(response.data.sys.sunrise * 1000);
  sunrise.innerHTML = sunriseTime;

  let sunset = document.querySelector("#sunset-time");
  let sunsetTime = formatTime(response.data.sys.sunset * 1000);
  sunset.innerHTML = sunsetTime;
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
let form = document.querySelector("#city-entered");
form.addEventListener("submit", city);

//code to display searched city weather ends

//code to get current location weather when location button is clicked starts

function showCurrentLocationWeather() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let currentLocationWeather = document.querySelector("#current-location-icon");
currentLocationWeather.addEventListener("click", showCurrentLocationWeather);

//code to get current location weather when location button is clicked ends
