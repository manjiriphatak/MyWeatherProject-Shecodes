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
let hours = now.getHours();
let unit = "";
if (hours < 10) {
  hours = `0${hours}`;
}
if (hours > 12) {
  unit = "PM";
} else {
  unit = "AM";
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let updateDate = document.querySelector("#todaysdate");
let displayDate = `${day}, ${date} ${month}, ${year}, ${hours}:${minutes} ${unit}`;
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
  let cityDisplay = document.querySelector("#city-display");
  let cityName = response.data.name;
  cityName = cityName.toUpperCase();
  cityDisplay.innerHTML = cityName;

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

  let mainicon = document.querySelector("#icon");
  mainicon.setAttribute("src", `icons/${response.data.weather[0].icon}.png`);

  forecastCoords(response.data.coord);
}

function city(city) {
  let apiKey = "b433aea7f2b3444f708346b87eb93b9d";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showTemp);
}

function searchSubmit(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#city-text-input");
  city(citySearch.value);
}

function formatday(timestamp) {
  let date = new Date(timestamp * 1000);

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];
  return day;
}
function weatherForecast(response) {
  let forecastElement = document.querySelector("#forecast");

  let forecast = response.data.daily;

  let forecastHtml = `<div class="row">`;

  forecast.forEach(function (forecastday, index) {
    if (index < 7) {
      forecastHtml =
        forecastHtml +
        `
    <div class="col forcast">
    ${formatday(forecastday.dt)}
    <div class="forcastEmoji"> 
    <input
    type="image"
    src="icons/${forecastday.weather[0].icon}.png"
    width="60px"
    /></div>
    <div class="forcastTemp">
    <span class="maxTemp">${Math.round(
      forecastday.temp.max
    )}</span>°/ <span class="minTemp">${Math.round(
          forecastday.temp.min
        )}</span>°C
        </div>
        </div>
        `;
    }
  });
  forecastHtml = forecastHtml + `</div>`;
  forecastElement.innerHTML = forecastHtml;
}

function forecastCoords(coordinates) {
  let lat = coordinates.lat;
  let lon = coordinates.lon;
  let apiKey = "b433aea7f2b3444f708346b87eb93b9d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(weatherForecast);
}
function showCurrentLocationWeather() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let celsiusTemperature = null;
let feelsLikeTemp = null;
let showWind = null;

let form = document.querySelector("#city-entered");
form.addEventListener("submit", searchSubmit);

let currentLocationWeather = document.querySelector("#current-location-icon");
currentLocationWeather.addEventListener("click", showCurrentLocationWeather);

city("toronto");
