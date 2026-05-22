
const currentYear = new Date().getFullYear();
document.querySelector("#currentYear").textContent = currentYear;

const lastModified = document.lastModified;
document.querySelector("#lastModified").textContent = lastModified;

function calculateWindChill(temp, speed) {
    return (35.74 + (0.6215 * temp) - (35.75 * Math.pow(speed, 0.16)) + (0.4275 * temp * Math.pow(speed, 0.16))).toFixed(1);
}

const apiKey = "9d25e14acb094d677982b7bef5cca198";
const city = "Kahului";
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

fetch(url)
    .then(response => response.json())
    .then(data => {

        const temperature = data.main.temp;
        const windSpeed = data.wind.speed;

        document.querySelector("#temperature").textContent = `${temperature}°F`;
        document.querySelector("#humidity").textContent = `${data.main.humidity}%`;
        document.querySelector("#wind").textContent = `${windSpeed} mph`;
        document.querySelector("#condition").textContent = data.weather[0].description;

        const windChillDisplay = document.querySelector("#wind-chill");

        if (temperature <= 50 && windSpeed > 3) {
            windChillDisplay.textContent = `${calculateWindChill(temperature, windSpeed)}°F`;
        } else {
            windChillDisplay.textContent = "N/A";
        }
    })
    .catch(error => {
        console.error("Weather data could not be loaded:", error);
    });