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


//Show tempature with city

function displayWeather(response) {
  //get
  let cityNameElement = response.data.list[0].name;
  let tempElement = response.data.list[0].main.temp;
  let windElement = response.data.list[0].wind.speed;
  let humidityElement = response.data.list[0].main.humidity;
  let mainElement = response.data.list[0].weather[0].main;
  let iconElement = response.data.list[0].weather[0].icon;
  //set
  currentTempWithCelsius = tempElement;
  document.querySelector("#city-name").innerHTML = cityNameElement;
  document.querySelector("#degree").innerHTML = Math.round(currentTempWithCelsius);
  document.querySelector("#main").innerHTML = mainElement;
  document.querySelector("#humidity").innerHTML = humidityElement;
  document.querySelector("#speed").innerHTML = windElement;
  document.querySelector("#icon-current-weather").src=`http://openweathermap.org/img/wn/${iconElement.slice(0,-1)}n@2x.png`;  
}


function displayPosition(location) {
  let lat = location.coords.latitude;
  let lon = location.coords.longitude;
  let cnt = 1;
  let url = `https://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&cnt=${cnt}&appid=${apiKey}&units=metric`;
  axios.get(url).then(displayWeather);
}
function handlePosition(){
  navigator.geolocation.getCurrentPosition(displayPosition);
}

function searchWithCityName(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/find?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
}

function search(event) {
  event.preventDefault();
  let cityNameSearched = document.querySelector("#search-input").value;
  searchWithCityName(cityNameSearched);
}

//Change celsius to fahrenheit
function convertCi(event) {
  event.preventDefault();  
  let tempElement = document.querySelector("#degree");
  celsiusElement.classList.add("active");
  fahrenheitElement.classList.remove("active");
  let temp = Math.round(currentTempWithCelsius);
  tempElement.innerHTML = temp;
}


function convertToFahrenheit(event) {
  event.preventDefault();
  fahrenheitElement.classList.add("active");
  celsiusElement.classList.remove("active");
  let cToF = Math.round((currentTempWithCelsius * 9) / 5 + 32);
  let tempElement = document.querySelector("#degree");
  tempElement.innerHTML = cToF;
}


// event for button
let celsiusElement = document.querySelector("#celsius");
celsiusElement.addEventListener("click", convertCi);

let fahrenheitElement = document.querySelector("#fahrenheit");
fahrenheitElement.addEventListener("click", convertToFahrenheit);

let apiKey = "469611e51569c75f911c80b0cea9dfa5";

let btnYourCity = document.querySelector("#yourCity");
btnYourCity.addEventListener("click",handlePosition);

// let btnAhvaz = document.querySelector("#ahvaz");
// console.log("ahvaz");
// btnAhvaz.addEventListener("click",searchWithCityName("Ahvaz"));

// let btnTehran = document.querySelector("#tehran");
// console.log("tehran");
// btnTehran.addEventListener("click",searchWithCityName("Tehran"));

// let btnShiraz = document.querySelector("#shiraz");
// console.log("shiraz");
// btnShiraz.addEventListener("click",searchWithCityName("Shiraz"));


let formSearch = document.querySelector("#form-search");
formSearch.addEventListener("submit", search);


let currentTempWithCelsius = null;


searchWithCityName("paris");
