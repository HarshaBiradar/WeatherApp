const apiKey="9762215f163303985e6215ed4dcaf048";
const apiUrl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox=document.querySelector(".search input");
const searchBtn=document.querySelector(".search button");
const weatherCard = document.querySelector(".weather");
const toggleIcon = document.querySelector(".toggle-icon");

let isExpanded = false;

async function checkWeather(city) {
try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (!response.ok) {
        throw new Error("City not found");
    }
    const data = await response.json();
    updateWeatherUI(data);
} catch (error) {
    alert(error.message);
}
}

function updateWeatherUI(data) {

weatherCard.innerHTML = `
    <img src="images/${data.weather[0].main.toLowerCase()}.png" alt="weather-img" class="weather-icon" onerror="this.src='images/default.png'">
    <h1 class="temp">${Math.round(data.main.temp)}°C</h1>
    <h2 class="city">${data.name}</h2>
    <div class="details">
        <div class="col">
            <img src="images/humidity.png" alt="humidity-img">
            <div>
                <p class="humidity">${data.main.humidity}%</p>
                <p>Humidity</p>
            </div>
        </div>
        <div class="col">
            <img src="images/wind.png" alt="wind-img">
            <div>
                <p class="wind">${data.wind.speed} km/h</p>
                <p>Wind Speed</p>
            </div>
        </div>
    </div>
    <div class="toggle">
        <img src="images/nextpage.png" alt="arrow-img" class="toggle-icon">
        <p>Click for more details</p>
    </div>
`;


const toggle = document.querySelector(".toggle");
toggle.addEventListener("click", () => toggleDetails(data));
}

function toggleDetails(data) {
if (isExpanded) {

    updateWeatherUI(data);
} else {
   
    weatherCard.innerHTML = `
        <h2 class="city">${data.name}</h2>
        <p><strong>Temperature:</strong> ${Math.round(data.main.temp)}°C</p>
        <p><strong>Feels Like:</strong> ${data.main.feels_like}°C</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${data.wind.speed} km/h</p>
        <p><strong>Pressure:</strong> ${data.main.pressure} hPa</p>
        <p><strong>Max Temp:</strong> ${data.main.temp_max}°C</p>
        <p><strong>Min Temp:</strong> ${data.main.temp_min}°C</p>
        <div class="toggle">
            <img src="images/nextpage.png" alt="arrow-img" class="toggle-icon">
            <p>Click to return</p>
        </div>
    `;

 
    const toggle = document.querySelector(".toggle");
    toggle.addEventListener("click", () => toggleDetails(data));

}
isExpanded = !isExpanded; 
}


searchBtn.addEventListener("click", () => {
const city = searchBox.value.trim();
if (city) checkWeather(city);
});

searchBox.addEventListener("keypress", (event) => {
if (event.key === "Enter") {
    const city = searchBox.value.trim();
    if (city) checkWeather(city);
}
});


checkWeather("Kalaburagi");




