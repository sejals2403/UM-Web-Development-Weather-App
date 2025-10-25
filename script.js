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

  // Validation
  if (city === "") {
    showError("Please enter a city name.");
    return;
  }

  try {
    // Fetch weather data from OpenWeatherMap
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    // Handle invalid responses
    if (!response.ok) {
      throw new Error("City not found. Please try again.");
    }

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    showError(error.message);
  }
}

// Display weather data
function displayWeather(data) {
  const { name } = data;
  const { icon, description } = data.weather[0];
  const { temp } = data.main;

  cityName.textContent = name;
  weatherDescription.textContent =
    description.charAt(0).toUpperCase() + description.slice(1);
  temperature.textContent = `🌡️ ${temp.toFixed(1)}°C`;
  weatherIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  // Show weather data and hide error
  weatherResult.classList.remove("hidden");
  errorMessage.classList.add("hidden");
}

// Show error messages
function showError(message) {
  errorMessage.textContent = `✖ ${message}`;
  errorMessage.classList.remove("hidden");
  weatherResult.classList.add("hidden");
}
