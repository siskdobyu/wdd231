// ---------------------
// MOBILE MENU
// ---------------------
const menuBtn = document.querySelector("#menuBtn");
const navMenu = document.querySelector("#navMenu");

menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("hidden");
});


// ---------------------
// FOOTER DATES
// ---------------------
document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = document.lastModified;


// ---------------------
// WEATHER API
// ---------------------
const apiKey = "YOUR_API_KEY";   // <--OpenWeatherMap API key
const city = "Makati";

const currentWeatherURL =
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

const forecastURL =
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;


// Fetch current weather
async function getWeather() {
    try {
        const response = await fetch(currentWeatherURL);
        const data = await response.json();

        document.querySelector("#currentWeather").innerHTML = `
            <p><strong>Temperature:</strong> ${data.main.temp.toFixed(1)}°C</p>
            <p><strong>Condition:</strong> ${data.weather[0].description}</p>
        `;
    } catch (err) {
        console.error("Error fetching current weather:", err);
    }
}


// Fetch 3-day forecast
async function getForecast() {
    try {
        const response = await fetch(forecastURL);
        const data = await response.json();

        // Forecast every 3 hrs → pick entries at 12:00:00
        const filtered = data.list.filter(d => d.dt_txt.includes("12:00:00")).slice(0, 3);

        const container = document.querySelector("#forecast");
        container.innerHTML = "";

        filtered.forEach(day => {
            const date = new Date(day.dt_txt);
            const options = { weekday: "short", month: "short", day: "numeric" };

            container.innerHTML += `
                <div class="forecast-card">
                    <p><strong>${date.toLocaleDateString("en-US", options)}</strong></p>
                    <p>${day.main.temp.toFixed(1)}°C</p>
                    <p>${day.weather[0].description}</p>
                </div>
            `;
        });

    } catch (err) {
        console.error("Error fetching forecast:", err);
    }
}

getWeather();
getForecast();


// ---------------------
// BUSINESS SPOTLIGHTS
// ---------------------
async function getSpotlights() {
    try {
        const response = await fetch("data/members.json");
        const data = await response.json();

        // Gold + Silver only
        const filtered = data.members.filter(m =>
            m.membership === "Gold" || m.membership === "Silver"
        );

        // Randomize
        const shuffled = filtered.sort(() => Math.random() - 0.5);

        // Select 2 or 3
        const selected = shuffled.slice(0, 3);

        const container = document.querySelector("#spotlightContainer");
        container.innerHTML = "";

        selected.forEach(member => {
            container.innerHTML += `
                <div class="spotlight-card">
                    <img src="${member.image}" alt="${member.name} logo">
                    <h3>${member.name}</h3>
                    <p>${member.address}</p>
                    <p>${member.phone}</p>
                    <a href="${member.website}" target="_blank">Visit Website</a>
                    <p class="membership-level ${member.membership.toLowerCase()}">${member.membership} Member</p>
                </div>
            `;
        });

    } catch (err) {
        console.error("Error loading spotlights:", err);
    }
}

getSpotlights();
