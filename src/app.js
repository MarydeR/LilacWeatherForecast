// day update
function displayWeekDay(fulldate) {
  console.log(fulldate);
  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let numberday = fulldate.getDay();
  let day = weekdays[numberday];
  //let hour = fulldate.getHours();
  //let min = fulldate.getMinutes();
  let sentenceDay = `${day}`;
  return sentenceDay;
}
// date update
function displayDate(fulldate) {
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
  let numbermonth = fulldate.getMonth();
  let month = months[numbermonth];
  let date = fulldate.getDate();
  let year = fulldate.getFullYear();

  let sentencedate = `${date} ${month} ${year}`;
  return sentencedate;
}

// time update
function displaylocaltime(fulldate) {
  let hour = fulldate.getHours();
  let min = fulldate.getMinutes();
  let sentenceTime = `${hour}:${min}`;
  return sentenceTime;
}
let now = new Date();
document.querySelector("#weekday").innerHTML = displayWeekDay(now);
document.querySelector("#date").innerHTML = displayDate(now);
document.querySelector("#localtime").innerHTML = displaylocaltime(now);

// default City Temp
function searchCity(city) {
  let apikey = "2ec340bdbdo84acaf6ct2a055b44668d";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apikey}&units=metric`;
  let apiForeURL = `https://api.shecodes.io/weather/v1/forecast?query==${city}&key=${apikey}&units=metric`;
  axios.get(apiUrl).then(showWeather).catch(showError);
  axios.get(apiForeURL).then(displayForecast).catch(showError);
}

function showWeather(response) {
  //console.log(response);
  let city = response.data.city;
  let maintemp = Math.round(response.data.temperature.current);
  celsiustemp = Math.round(response.data.temperature.current);
  let weathercondition = response.data.condition.description;
  let iconurl = response.data.condition.icon_url;
  let feelslike = Math.round(response.data.temperature.feels_like);
  celsiusfeelslike = Math.round(response.data.temperature.feels_like);
  let wind = Math.round(response.data.wind.speed);
  let humid = Math.round(response.data.temperature.humidity);
  document.querySelector("#maincity").innerHTML = `${city}`;
  document.querySelector("#maintempnumber").innerHTML = `${maintemp}`;
  document.querySelector("#condition").innerHTML = `${weathercondition}`;
  document.querySelector("#weathericon").setAttribute("src", iconurl);
  document.querySelector("#feelslike").innerHTML = `${feelslike}°`;
  document.querySelector("#wind").innerHTML = `${wind}`;
  document.querySelector("#humid").innerHTML = `${humid}`;
}

function showError() {
  document.querySelector("#maincity").innerHTML = `The city is not found`;
}
searchCity("Brussels");

//forecast API
//function showForecast(response) {
// console.group(response);
//}

// forecast html injection
function formatDayforecast(timestamp) {
  //console.log(timestamp);
  let date = new Date(timestamp * 1000);
  //console.log(date);
  let day = date.getDay();
  let weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return weekdays[day];
}
function displayForecast(response) {
  console.log(response.data.daily);

  let dailyforcast = response.data.daily;
  let forecastSection = document.querySelector("#sectionforecast");
  let forecastHTML = `<div class="row">`;
  dailyforcast.forEach(function (forecastday, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
         <div class="col">
            <div id="forcastday">${formatDayforecast(forecastday.time)}</div>
                <img
                    src=${forecastday.condition.icon_url}
                    alt="forecast icon"
                    id="forecasticon"
                    width="70"
                />
                
            <div class="forecastHL">
                <span id="forecastH">${Math.round(
                  forecastday.temperature.maximum
                )}°</span>
                <span id="forecastL">${Math.round(
                  forecastday.temperature.minimum
                )}°</span>
            </div>
        </div>
        `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastSection.innerHTML = forecastHTML;
}

// Search Engine

function citychange(event) {
  event.preventDefault();

  let valuecity = document.querySelector("#input-city");
  let newcityname = valuecity.value;
  searchCity(newcityname);
}

let cityform = document.querySelector("#enter-city");
cityform.addEventListener("submit", citychange);

// current position

function currentlocation(event) {
  event.preventDefault();

  navigator.geolocation.getCurrentPosition(getPositionTemp);
}

function getPositionTemp(position) {
  //console.log(position);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apikey = "2ec340bdbdo84acaf6ct2a055b44668d";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apikey}&units=metric`;
  let apiForeURL = `https://api.shecodes.io/weather/v1/forecast?lon=${lon}&lat=${lat}&key=${apikey}&units=metric`;
  axios.get(apiUrl).then(showWeather).catch(showError);
  axios.get(apiForeURL).then(displayForecast).catch(showError);
}
let currentform = document.querySelector("#currentcitybutton");
currentform.addEventListener("click", currentlocation);
