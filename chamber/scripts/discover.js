// current year in footer
document.querySelector("#currentyear").textContent = new Date().getFullYear();

document.getElementById("lastModified").innerHTML = document.lastModified;

// ---------------------
// MOBILE MENU
// ---------------------
const menuBtn = document.querySelector("#menuBtn");
const navMenu = document.querySelector("#navMenu");

menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("hidden");
});


//Export Interests
import { places } from "../data/places.mjs";


function displayItems(places) {

    const showhere = document.querySelector("#allplaces");
    
    places.forEach(x => {
        // build the card element
        const thecard = document.createElement('div')

        // build the photo element
        const thephoto = document.createElement('img')
        thephoto.src = x.image;
        thephoto.alt = x.alt;
        thecard.appendChild(thephoto)

        // build the title element
        const thetitle = document.createElement('h2')
        thetitle.innerText = x.name
        thecard.appendChild(thetitle)

        // build the address element
        const theaddress = document.createElement('address')
        theaddress.innerText = x.address
        thecard.appendChild(theaddress)

        // build the description element
        const thedesc = document.createElement('p')
        thedesc.innerText = x.description
        thecard.appendChild(thedesc)

        showhere.appendChild(thecard)
    }) // end loop
}

displayItems(places);

//visit tracking
const messageDisplay = document.getElementById('visit-message');
const LS_KEY = 'lastVisitDate';
const currentDate = Date.now();
const lastVisitString = localStorage.getItem(LS_KEY);

if (lastVisitString === null) {
    // First Visit

    // Display the initial welcome message
    messageDisplay.textContent = "Welcome! Let us know if you have any questions.";
} 

else {
    // Subsequent Visits

    const lastVisitDate = Number(lastVisitString); // Convert stored string to number (milliseconds)
    // Calculate the difference in milliseconds
    const timeDifference = currentDate - lastVisitDate;

    // Define constants for time conversion (milliseconds)
    const millisecondsInDay = 1000 * 60 * 60 * 24;

    // Calculate the difference in days (including fractions)
    const daysDifference = timeDifference / millisecondsInDay;

    if (daysDifference < 1) {
        // Less than 24 hours (less than 1 day)
        messageDisplay.textContent = "Back so soon! Awesome!";

    } else {
        // 1 day or more

        // Round down to get the whole number of days
        const daysAgo = Math.floor(daysDifference);

        let message;
        if (daysAgo === 1) {
            message = "You last visited 1 day ago.";
        } else {
            message = `You last visited ${daysAgo} days ago.`;
        }

        messageDisplay.textContent = message;
    }
}

// Update localStorage with the current visit date for next time
localStorage.setItem(LS_KEY, currentDate);