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
const apiKey = "382d16a6c74cd5831ebb74fbcf9286cb";   // <--OpenWeatherMap API key
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
const spotlightContainer = document.querySelector("#spotlights");
const membersURL = "data/members.json"; 

async function loadSpotlights() {
    try {
        const response = await fetch(membersURL);

        if (!response.ok) {
            throw new Error("Failed to fetch members.json");
        }

        const data = await response.json();

        // Filter only gold and silver members
        const qualifiedMembers = data.members.filter(member =>
            member.membership === "Gold" || member.membership === "Silver"
        );

        // Randomize order
        shuffleArray(qualifiedMembers);

        // Select 2 or 3 members randomly
        const spotlightCount = Math.random() < 0.5 ? 2 : 3;
        const selectedMembers = qualifiedMembers.slice(0, spotlightCount);

        // Clear any existing content
        spotlightContainer.innerHTML = "";

        // Build spotlight cards
        selectedMembers.forEach(member => {
            const card = document.createElement("div");
            card.classList.add("spotlight-card");

            card.innerHTML = `
                <img src="images/${member.image}" alt="${member.name} logo">
                <h3>${member.name}</h3>
                <p><strong>Membership:</strong> ${member.membership}</p>
                <p><strong>Phone:</strong> ${member.phone}</p>
                <p><strong>Address:</strong> ${member.address}</p>
                <a href="${member.website}" target="_blank" class="spotlight-link">Visit Website</a>
            `;

            spotlightContainer.appendChild(card);
        });

    } catch (error) {
        console.error("Spotlights Error:", error);
    }
}

// Utility: Fisher–Yates shuffle
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

loadSpotlights();
