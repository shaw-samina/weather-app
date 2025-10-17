function handleSearchSubmit(event) {
  event.preventDefault();
  let enterCityBox = document.querySelector("#search-form-input");
  let city = document.querySelector("#city");
  city.innerHTML = enterCityBox.value;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);
