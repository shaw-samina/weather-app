function updateWeather(response) {
  let temperature = document.querySelector("#current-temp");
  let currentTemp = response.data.temperature.current;
  temperature.innerHTML = Math.round(currentTemp);
  let city = document.querySelector("#city");
  city.innerHTML = response.data.city;
  let description = document.querySelector("#description");
  description.innerHTML = response.data.condition.description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
  let windSpeed = document.querySelector("#windspeed");
  windSpeed.innerHTML = `${response.data.wind.speed} mph`;
  let dayAndTime = document.querySelector("#day-and-time");
  let date = new Date(response.data.time * 1000);
  dayAndTime.innerHTML = formatDate(date);
  let icon = document.querySelector("#icon");
  icon.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-emoji" />`;
  getForecast(response.data.city);
}
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hour = date.getHours();
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }

  return `${day}, ${hour}:${minute}`;
}

function searchCity(city) {
  let apiKey = "f0a4tbb1fc986b4d534ccb04b8291ao0";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(updateWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let enterCityBox = document.querySelector("#search-form-input");

  searchCity(enterCityBox.value);
}
function formatDay(timestamp) {
  let day = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day.getDay()];
}

function getForecast(city) {
  let apiKey = "f0a4tbb1fc986b4d534ccb04b8291ao0";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showForecast);
}

function showForecast(response) {
  let days = ["Wed", "Thu", "Fri", "Sat", "Sun"];
  let forecastLoop = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastLoop =
        forecastLoop +
        `
          <div class="weather-forecast-days">
            <div class="forecast-day">${formatDay(day.time)}</div>
            <div class="forecast-icon">
            <img src="${day.condition.icon_url}" />
            </div>
            <div class="forecast-temps">
              <div class="forecast-temp"><strong>${Math.round(
                day.temperature.maximum
              )}</strong></div>
              <div class="forecast-temp">${Math.round(
                day.temperature.minimum
              )}</div>
            </div>
          </div>  `;
    }
  });
  let forecast = document.querySelector("#forecast");
  forecast.innerHTML = forecastLoop;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Chicago");
