// Get Time

let now = new Date();
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
  "December"
];
let month = months[now.getMonth()];
let day = now.getDate();
let date = document.querySelector("#date");
date.innerHTML = `${day} ${month} ${now.getFullYear()}`;

// ********************************************* //


//Show tempature with city

function displayWeather(response) {
  console.log(response.data);
  //get
  let cityNameElement = response.data.list[0].name;
  currentTempWithCelesius = response.data.list[0].main.temp;
  console.log(currentTempWithCelesius);
  let tempElement = Math.round(currentTempWithCelesius);
  let windElement = response.data.list[0].wind.speed;
  let humidityElement = response.data.list[0].main.humidity;
  let mainElement = response.data.list[0].weather[0].main;
  let iconElement = response.data.list[0].weather[0].icon;
  //set
  document.querySelector("#city-name").innerHTML = cityNameElement;
  document.querySelector("#degree").innerHTML = tempElement;
  document.querySelector("#main").innerHTML = mainElement;
  document.querySelector("#humidity").innerHTML = humidityElement;
  document.querySelector("#speed").innerHTML = windElement;
  document.querySelector("#icon-current-weather").src=`http://openweathermap.org/img/wn/${iconElement.slice(0,-1)}n@2x.png`;
}

// *********************************************** //

function getLocation(location) {
  let lat = location.coords.latitude;
  let lon = location.coords.longitude;
  let cnt = 1;
  let url = `https://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&cnt=${cnt}&appid=${apiKey}&units=metric`;
  axios.get(url).then(displayWeather);
}
// ********************************************* //

function searchWithCityName(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/find?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
}
// ********************************************* //



function search(event) {
  event.preventDefault();
  let cityNameSearched = document.querySelector("#search-input").value;
  searchWithCityName(cityNameSearched);
}



//Change celsius to fahrenheit
function convertCi(event) {
  let temp = document.querySelector("#degree");
  event.preventDefault();
  temp.innerHTML = 24;
}
let C = document.querySelector("#celsiu");
C.addEventListener("click", convertCi);

function convertFah(event) {
  event.preventDefault();
  let cToF = Math.round((24 * 9) / 5 + 32);
  let F = document.querySelector("#degree");
  F.innerHTML = cToF;
}

let F = document.querySelector("#fahrenheit");
F.addEventListener("click", convertFah);

// ********************************************* //
// event for button

let apiKey = "469611e51569c75f911c80b0cea9dfa5";

let currentTempWithCelesius = "";

let formSearch = document.querySelector("#form-search");
formSearch.addEventListener("submit", search);

let yourLocation = navigator.geolocation.getCurrentPosition(getLocation);
getLocation(yourLocation);


// let currentBtn = document.querySelector("#current");
// currentBtn.addEventListener("click", function (event) {
//   event.preventDefault();
//   return yourLocation;
// });
// ********************************************* //