// day and date update
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
function displayWeekDay(fulldate) {
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
let now = new Date();
document.querySelector("#weekday").innerHTML = displayWeekDay(now);
document.querySelector("#date").innerHTML = displayDate(now);

// default City Temp
function searchCity(city) {
  let apikey = "2ec340bdbdo84acaf6ct2a055b44668d";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apikey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function showWeather(response) {
  console.log(response);
  let city = response.data.city;
  let maintemp = Math.round(response.data.temperature.current);
  let weathercondition = response.data.condition.description;
  let iconurl = response.data.condition.icon_url;
  let feelslike = Math.round(response.data.temperature.feels_like);
  let wind = Math.round(response.data.wind.speed);
  let humid = Math.round(response.data.temperature.humidity);
  document.querySelector("#maincity").innerHTML = `${city}`;
  document.querySelector("#maintempnumber").innerHTML = `${maintemp}`;
  document.querySelector("#condition").innerHTML = `${weathercondition}`;
  document.querySelector("#weathericon").setAttribute("src", iconurl);
  document.querySelector("#feelslike").innerHTML = `${feelslike}`;
  document.querySelector("#wind").innerHTML = `${wind}`;
  document.querySelector("#humid").innerHTML = `${humid}`;
}
searchCity("Brussels");
