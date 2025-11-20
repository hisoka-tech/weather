const apiKey = "c90459cc35b99d3c0d9f9127529cef91";

document.getElementById("searchBtn").addEventListener("click", () => {
    const city = document.getElementById("cityInput").value.trim();
    if (city) {
        getWeather(city);
    }
});

async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);

        // City not found
        if (!response.ok) {
            showError("City not found. Try again.");
            return;
        }

        const data = await response.json();
        updateUI(data);
    } catch (error) {
        showError("Network error. Please try again.");
    }
}
function getWeatherClass(id) {
    if (id === 800) {
        return 'clear';
    } else if (id >= 200 && id < 300) {
        return 'thunderstorm';
    } else if (id >= 300 && id < 400) {
        return 'drizzle';
    } else if (id >= 500 && id < 600) {
        return 'rain';
    } else if (id >= 600 && id < 700) {
        return 'snow';
    } else if (id >= 700 && id < 800) {
        return 'clouds';
    } else if (id > 800 && id < 900) {
        return 'clouds';
    } else {
        return 'clouds';
    }
}

function updateUI(data) {
    document.getElementById("error").textContent = "";

    document.getElementById("cityName").textContent = data.name;
    document.getElementById("temp").textContent = data.main.temp;
    document.getElementById("humidity").textContent = data.main.humidity;
    document.getElementById("wind").textContent = data.wind.speed;
    document.getElementById("condition").textContent = data.weather[0].description;

    document.getElementById("weatherBox").classList.remove("hidden");

    // ===== APPLY WEATHER BACKGROUND =====
    const id = data.weather[0].id;  // weather condition ID
    const weatherClass = getWeatherClass(id);

    // Remove previous weather classes
    document.body.className = "";

    // Add new weather class
    document.body.classList.add(weatherClass);

    // Detect night mode using "10d" or "10n" icon
    const icon = data.weather[0].icon;
    if (icon.endsWith("n")) {
        document.body.classList.add("night");
    }
}


function showError(message) {
    document.getElementById("weatherBox").classList.add("hidden");
    document.getElementById("error").textContent = message;
}
