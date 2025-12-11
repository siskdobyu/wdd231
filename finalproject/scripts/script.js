// ---------------------
// MOBILE MENU & FOOTER DATES
// ---------------------
const menuBtn = document.querySelector("#menuBtn");
const navMenu = document.querySelector("#navMenu");

if (menuBtn && navMenu) {
    menuBtn.addEventListener("click", () => {
        navMenu.classList.toggle("hidden");
    });
}

document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = document.lastModified;


// ---------------------
// DIRECTORY / EMERGENCY CONTACTS
// ---------------------
const directory = document.querySelector("#directory");

async function loadMembers() {
    
    try {
        const response = await fetch("data/emergencycontacts.json");
        if (!response.ok) {
            console.error(`Error loading members: ${response.status} ${response.statusText}`);
            if (directory) {
                directory.innerHTML = "<p>Error loading resources. Please check file path and content.</p>";
            }
            return;
        }
        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        console.error("Failed to parse JSON or fetch data:", error);
        if (directory) {
            directory.innerHTML = "<p>A critical error occurred while displaying resources.</p>";
        }
    }
}

function displayMembers(members) {
    
    if (!directory) return;
    directory.innerHTML = "";
    members.forEach(member => {
        const card = document.createElement("div");
        card.classList.add("resource-card", "hotline");
        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
            <h3>${member.name}</h3>
            <p><strong>Service:</strong> ${member.service || 'N/A'}</p>
            <p><strong>Contact:</strong> <a href="tel:${member.phone}">${member.phone}</a></p>
            <p><strong>Operating Hours:</strong> ${member.hours || '24/7'}</p>
            ${member.link ? `<p><a href="${member.link}" target="_blank">Visit Website</a></p>` : ''}
        `;
        directory.appendChild(card);
    });
}


// ---------------------
// MODAL HANDLING
// ---------------------
function initModals() {
    
}
function openModal(modal) {

}
function closeModal(modal) {

}


// ---------------------
// Populate Thank You Page
// ---------------------
function populateThankYouPage() {
    if (!document.body.classList.contains('thankyou-page')) return;

    const params = new URLSearchParams(window.location.search);

    const fields = [
        { param: 'firstName', id: 'out-firstName' },
        { param: 'lastName', id: 'out-lastName' },
        { param: 'email', id: 'out-email' },
        { param: 'phone', id: 'out-phone' },
        { param: 'timestamp', id: 'out-timestamp' }
    ];

    fields.forEach(field => {
        const el = document.getElementById(field.id);
        if (el) el.textContent = params.get(field.param) || '(not provided)';
    });
}


// ----------------------------------------------------
// FORM SUBMISSION LISTENER 
// ----------------------------------------------------
// This function ensures the form exists and the script is on the right page
function initializeFormTimestamp() {
    // Check for the form element 
    const form = document.querySelector('form');
    // Check for the timestamp input field (used in the form)
    const timestampField = document.getElementById('timestamp-field');

    if (form && timestampField) {
        form.addEventListener('submit', function () {
            // Set the value of the hidden input field right before submission
            timestampField.value = new Date().toISOString();
        });
    }
}




// ---------------------
// INITIALIZATION CALLS 
// ---------------------
loadMembers();
initModals();

window.addEventListener('DOMContentLoaded', () => {
    populateThankYouPage();
    initializeFormTimestamp(); 
});