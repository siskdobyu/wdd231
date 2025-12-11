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

/// === Fetch Members ===
const directory = document.querySelector("#directory");

async function loadMembers() {
    const response = await fetch("data/emergencycontacts.json");
    const members = await response.json();

    displayMembers(members);
}

function displayMembers(members) {
    directory.innerHTML = "";

    members.forEach(member => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
            <h3>${member.name}</h3>
            <p>${member.phone}</p>
            <a href="${member.link}" target="_blank">Link</a>
        `;

        directory.appendChild(card);
    });
}

loadMembers();

initModals();
// ---------- MODAL HANDLING (WORKING) ----------
function initModals() {
    const modalLinks = document.querySelectorAll('.open-modal');
    const modals = document.querySelectorAll('.modal');

    // OPEN MODAL
    modalLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const modalId = link.getAttribute('data-target'); // ✅ now reads correct modal ID
            const modal = document.getElementById(modalId);
            if (modal) openModal(modal);
        });
    });

    // CLOSE MODAL
    modals.forEach(modal => {
        const closeBtn = modal.querySelector('.close-modal');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => closeModal(modal));
        }

        // Close if clicking outside .modal-content
        modal.addEventListener('click', e => {
            if (e.target === modal) closeModal(modal);
        });
    });

    // Close when ESC is pressed
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.dataset.visible === "true") closeModal(modal);
            });
        }
    });
}

function openModal(modal) {
    modal.dataset.visible = "true";
    modal.style.display = "flex";
    modal.setAttribute("aria-hidden", "false");
    modal.focus();
}

function closeModal(modal) {
    modal.dataset.visible = "false";
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
}

// ---------- Thank You Page Population ----------
function populateThankYouPage() {
    const params = new URLSearchParams(window.location.search);

    const fields = [
        { param: 'firstName', id: 'out-firstName' },
        { param: 'lastName', id: 'out-lastName' },
        { param: 'email', id: 'out-email' },
        { param: 'mobile', id: 'out-phone' },
        { param: 'timestamp', id: 'out-timestamp' }
    ];

    fields.forEach(field => {
        const el = document.getElementById(field.id);
        if (el) el.textContent = params.get(field.param) || '(not provided)';
    });
}


//Get form details

const urlParams = new URLSearchParams(window.location.search);
document.getElementById("firstName").textContent = urlParams.get('firstName');
document.getElementById("lastName").textContent = urlParams.get('lastName');
document.getElementById("email").textContent = urlParams.get('email');
document.getElementById("mobile").textContent = urlParams.get('mobile');
document.getElementById("timestamp").textContent = urlParams.get('timestamp');

// ---------------------
// Populate Thank You Page
// ---------------------
window.addEventListener('DOMContentLoaded', () => {
    populateThankYouPage();
});

function populateThankYouPage() {
    // Only run on thankyou page
    if (!document.body.classList.contains('thankyou-page')) return;

    const params = new URLSearchParams(window.location.search);

    const fields = [
        { param: 'firstName', id: 'out-firstName' },
        { param: 'lastName', id: 'out-lastName' },
        { param: 'email', id: 'out-email' },
        { param: 'mobile', id: 'out-phone' },
        { param: 'timestamp', id: 'out-timestamp' }
    ];

    fields.forEach(field => {
        const el = document.getElementById(field.id);
        if (el) el.textContent = params.get(field.param) || '(not provided)';
    });

    document.querySelector('form').addEventListener('submit', function () {
        this.querySelector('#timestamp').value = new Date().toISOString();
    });

}
