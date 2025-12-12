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
    // 1. Get all elements needed
    const modalLinks = document.querySelectorAll('.open-modal');
    const modals = document.querySelectorAll('.modal');

    // OPEN MODAL: Attach listeners to the "Key Symptoms" links
    modalLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const modalId = link.getAttribute('data-target');
            const modal = document.getElementById(modalId);
            if (modal) openModal(modal);
        });
    });

    // CLOSE MODAL: Attach listeners to close buttons and outside clicks
    modals.forEach(modal => {
        const closeBtn = modal.querySelector('.close-modal');
        // Close via 'X' button
        if (closeBtn) {
            closeBtn.addEventListener('click', () => closeModal(modal));
        }
        // Close via outside click
        modal.addEventListener('click', e => {
            if (e.target === modal) closeModal(modal);
        });
    });

    // ESC key closes any open modal
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                // Check if the modal is currently visible
                if (modal.dataset.visible === "true") closeModal(modal);
            });
        }
    });
}

function openModal(modal) {
    // Set a data attribute for tracking open state (used by ESC key logic)
    modal.dataset.visible = "true";
    // Change CSS display property from 'none' to 'flex' (as defined in your CSS)
    modal.style.display = "flex";
    // Set accessibility attributes
    modal.setAttribute("aria-hidden", "false");
    // Move focus to the modal for accessibility (optional, but good practice)
    modal.focus();
}

function closeModal(modal) {
    // Reset data attribute
    modal.dataset.visible = "false";
    // Hide the modal
    modal.style.display = "none";
    // Reset accessibility attributes
    modal.setAttribute("aria-hidden", "true");
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