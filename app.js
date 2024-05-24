const search_box = document.getElementById("search");
const container = document.querySelector(".container");
const search_btn = document.getElementById("search-btn");
const image = document.getElementById("imgs");
const weatherSec = document.querySelector(".weather-sec");
const temperature = document.getElementById("temp");
const forcast = document.getElementById("forcast");
const humidity = document.getElementById("humidity");
const wind_speed = document.getElementById("wind-speed");
const locationNotFound = document.querySelector(".location-not-found");
const weatherBody = document.querySelector(".weather-body");
const feelsLIke = document.querySelector(".feels-like");

const checkWeather = async (city) => {
  const api_key = "e03f7a53c7045e7beed231eedee51bb1";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
  const response = await fetch(url);
  const weather_data = await response.json();
  console.log(weather_data);

  if (weather_data.cod === "404") {
    weatherBody.style.display = "none";
    locationNotFound.style.display = "flex";
    return;
  } else {
    locationNotFound.style.display = "none";
    weatherBody.style.display = "flex";
  }

  temperature.innerText = Math.floor(weather_data.main.temp - 272.15) + "°C";
  forcast.innerText = weather_data.weather[0].main;
  humidity.innerText = weather_data.main.humidity + "%";
  wind_speed.innerText = weather_data.wind.speed + "Km/H";
  feelsLIke.innerText =
    "Feels Like " + Math.floor(weather_data.main.feels_like - 272.15) + "°C";

  if (weather_data.weather[0].main === "Clear", "haze") {
    image.src = "/imgs/clear.png";
    container.style.backgroundImage = 'url("/imgs/clear BG.jpg")'; 
  }if (weather_data.weather[0].main === "Clouds") {
    image.src = "/imgs/cloud.png";
    container.style.backgroundImage = 'url("/imgs/clouds BG.jpg")';
  } if (weather_data.weather[0].main === "Mist") {
    image.src = "/imgs/mist.png";
    container.style.backgroundImage = 'url("/imgs/mist BG.jpg")';
  } if (weather_data.weather[0].main === "Rain") {
    image.src = "/imgs/rain.png";
    container.style.backgroundImage = 'url("/imgs/rain BG.jpg")';
  } if (weather_data.weather[0].main === "Snow") {
    image.src = "/imgs/snow.png";
    container.style.backgroundImage = 'url("/imgs/snow BG.jpg")';
  }

  container.style.backgroundSize = "cover";
  container.style.backgroundPosition = "center";
  container.style.backgroundRepeat = "no-repeat";

  weatherBody.style.display = "flex";
};

search_btn.addEventListener("click", () => {
  checkWeather(search_box.value);
});
