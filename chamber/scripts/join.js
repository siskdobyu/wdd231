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


window.addEventListener('DOMContentLoaded', () => {
    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }
    initModals();
    populateThankYouPage();
});

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
    if (!document.body.classList.contains('thankyou-page')) return;


    const fields = [
        'firstName',
        'lastName',
        'email',
        'phone',
        'organization',
        'timestamp'
    ];


    fields.forEach(field => {
        const el = document.getElementById(field + '-display');
        if (el) el.textContent = params.get(field) || '(not provided)';
    });
}