const apiKey = "44fc022440be184b9e0afa4557d430a8";

const getWeatherBtn = document.getElementById("getWeatherBtn");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");
const cityName = document.getElementById("cityName");
const weatherDescription = document.getElementById("weatherDescription");
const temperature = document.getElementById("temperature");
const weatherIcon = document.getElementById("weatherIcon");
const errorMessage = document.getElementById("errorMessage");

getWeatherBtn.addEventListener("click", getWeather);

async function getWeather() {
  const city = cityInput.value.trim();

  if (city === "") {
    showError("Please enter a city name.");
    return;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      throw new Error("City not found. Please try again.");
    }

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    showError(error.message);
  }
}

function displayWeather(data) {
  const { name } = data;
  const { icon, description } = data.weather[0];
  const { temp } = data.main;

  cityName.textContent = name;
  weatherDescription.textContent =
    description.charAt(0).toUpperCase() + description.slice(1);
  temperature.textContent = `🌡️ ${temp.toFixed(1)}°C`;
  weatherIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  weatherResult.classList.remove("hidden");
  errorMessage.classList.add("hidden");
}

function showError(message) {
  errorMessage.textContent = `✖ ${message}`;
  errorMessage.classList.remove("hidden");
  weatherResult.classList.add("hidden");
}
