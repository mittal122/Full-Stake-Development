// Weather App Logic by Mittal Domadiya (D24CS122)

// IMPORTANT: Get your own API key from https://openweathermap.org/ and replace the placeholder below.
const apiKey = 'YOUR_API_KEY_HERE';

// Get elements from the DOM
const citySearchInput = document.getElementById('city-search-input');
const searchButton = document.getElementById('search-button');
const loader = document.getElementById('loader');
const weatherInfo = document.getElementById('weather-info');

const cityNameDisplay = document.getElementById('city-name-display');
const temperatureDisplay = document.getElementById('temperature-display');
const descriptionDisplay = document.getElementById('description-display');
const humidityDisplay = document.getElementById('humidity-display');
const windDisplay = document.getElementById('wind-display');
const weatherIconContainer = document.getElementById('weather-icon-container');

// Function to show/hide the loader
function toggleLoader(show) {
  if (show) {
    loader.classList.remove('hidden');
    weatherInfo.classList.add('hidden');
  } else {
    loader.classList.add('hidden');
    weatherInfo.classList.remove('hidden');
  }
}

// Function to get weather data for a specific city
async function getWeatherForCity(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  toggleLoader(true);
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.cod === 200) {
      renderWeatherData(data);
    } else {
      alert(`City not found: ${data.message}. Please try again.`);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    alert('Could not fetch weather data. Check your connection or API key.');
  } finally {
    toggleLoader(false);
  }
}

// Function to get weather data from browser's location
async function getWeatherForCurrentLocation(lat, lon) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  toggleLoader(true);
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.cod === 200) {
      renderWeatherData(data);
    } else {
      alert('Could not fetch weather for your location.');
    }
  } catch (error) {
    console.error('Error fetching location data:', error);
  } finally {
    toggleLoader(false);
  }
}

// Function to display the fetched weather data on the page
function renderWeatherData(data) {
  cityNameDisplay.textContent = data.name;
  temperatureDisplay.textContent = `${Math.round(data.main.temp)}°C`;
  descriptionDisplay.textContent = data.weather[0].description;
  humidityDisplay.textContent = `Humidity: ${data.main.humidity}%`;
  windDisplay.textContent = `Wind: ${data.wind.speed} m/s`;
  weatherIconContainer.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}">`;
}

// Function to ask for user's location
function requestLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        getWeatherForCurrentLocation(position.coords.latitude, position.coords.longitude);
      },
      () => {
        // If user denies location, show a default city or do nothing
        console.log('Location access was denied. User needs to search manually.');
        toggleLoader(false); // Hide loader if location is denied
        weatherInfo.classList.remove('hidden'); // Show default state
      }
    );
  } else {
    alert('Geolocation is not supported by this browser.');
  }
}

// --- Event Listeners ---

// Listen for clicks on the search button
searchButton.addEventListener('click', () => {
  const city = citySearchInput.value.trim();
  if (city) {
    getWeatherForCity(city);
  } else {
    alert('Please enter a city name.');
  }
});

// Allow pressing "Enter" to search
citySearchInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    searchButton.click();
  }
});

// Get user's location when the page loads
window.onload = requestLocation;