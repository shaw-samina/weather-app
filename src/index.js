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

function showForecast() {
  let days = ["Wed", "Thu", "Fri", "Sat", "Sun"];
  let forecastLoop = "";

  days.forEach(function (day) {
    forecastLoop =
      forecastLoop +
      `
          <div class="weather-forecast-days">
            <div class="forecast-day">${day}</div>
            <div class="forecast-icon">🌤️</div>
            <div class="forecast-temps">
              <div class="forecast-temp"><strong>60°</strong></div>
              <div class="forecast-temp">82°</div>
            </div>
          </div>  `;
  });
  let forecast = document.querySelector("#forecast");
  forecast.innerHTML = forecastLoop;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Chicago");
showForecast();
