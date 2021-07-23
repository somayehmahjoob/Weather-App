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

function getDay(dt){
  let now = new Date(dt * 1000);
  let days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  let day = days[now.getDay()];
  return day;
}

function displayWeatherForecast(response){
  let forecastElement = document.querySelector("#forecast");
  //console.log(response.data.daily);
  let forecastDays = response.data.daily;
  
  let forecastHTML = `<div class="row forecast-weather-daily">`;
  forecastDays.forEach(function(forecastDay , index){
    if(index < 5){
      forecastHTML =
      forecastHTML + `
      <div class="col-2 forecast-weather-day">
        <p>${getDay(forecastDay.dt)}</p>
        <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="${forecastDay.weather[0].description}">
        <div class="forecast-temp">
          <span class="forecast-temp-max">${Math.round(forecastDay.temp.max)}°c</span><span class="forecast-temp-min">${Math.round(forecastDay.temp.min)}°c</span>
        </div>
      </div>`;      
    //  console.log(forecastDay.weather[0].description); 
    //  console.log(`http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png `);
    }
  });

  forecastHTML = forecastHTML + `</div`;
  forecastElement.innerHTML = forecastHTML;
}



function getForecast(coordians){
  let apiKey = "469611e51569c75f911c80b0cea9dfa5";  
  let lat = coordians.lat;
  let lon = coordians.lon;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayWeatherForecast);
}

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
  cityNameForChangeUnit = cityNameElement;
  document.querySelector("#city-name").innerHTML = cityNameElement;
  document.querySelector("#degree").innerHTML = Math.round(currentTempWithCelsius);
  document.querySelector("#main").innerHTML = mainElement;
  document.querySelector("#humidity").innerHTML = humidityElement;
  document.querySelector("#speed").innerHTML = windElement;
  document.querySelector("#icon-current-weather").src=`http://openweathermap.org/img/wn/${iconElement.slice(0,-1)}n@2x.png`;  
  document.querySelector("#icon-current-weather").alt=`${response.data.list[0].weather[0].description}`;  
  //console.log(response.data);
  getForecast(response.data.list[0].coord);

}


function displayPosition(location) {
 
  let apiKey = "469611e51569c75f911c80b0cea9dfa5";
  let lat = location.coords.latitude;
  let lon = location.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&&appid=${apiKey}&units=${unit}`;
  axios.get(url).then(displayWeather);
}
function handlePosition(){
  navigator.geolocation.getCurrentPosition(displayPosition);
}

function searchWithCityName(city) {
  let apiKey = "469611e51569c75f911c80b0cea9dfa5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/find?q=${city}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
}

function search(event) {
  event.preventDefault();
  let cityNameSearched = document.querySelector("#search-input").value;
  searchWithCityName(cityNameSearched);
}

// event for button


let btnYourCity = document.querySelector("#yourCity");
btnYourCity.addEventListener("click",handlePosition);

let formSearch = document.querySelector("#form-search");
formSearch.addEventListener("submit", search);


let celsiusElement = document.querySelector("#celsius");
celsiusElement.addEventListener("click", function(event){
  event.preventDefault();
  unit="metric";  
  searchWithCityName(cityNameForChangeUnit);
  celsiusElement.classList.add("active");
  fahrenheitElement.classList.remove("active");

});

let fahrenheitElement = document.querySelector("#fahrenheit");
fahrenheitElement.addEventListener("click", function(event){
  event.preventDefault();
  unit = "imperial";
  searchWithCityName(cityNameForChangeUnit);
  fahrenheitElement.classList.add("active");
  celsiusElement.classList.remove("active");

});

let cityNameForChangeUnit =null;
let currentTempWithCelsius = null;
let unit = "metric";
searchWithCityName("paris");

