function updateWeather(response) {
  let temperature = document.querySelector("#current-temp");
  let currentTemp = response.data.temperature.current;
  temperature.innerHTML = Math.round(currentTemp);
  let city = document.querySelector("#city");
  city.innerHTML = response.data.city;
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

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Chicago");
