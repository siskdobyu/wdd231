// // Set timestamp value
// document.getElementById("timestamp").value = new Date().toISOString();

// // Modal functions
// function openModal(id) {
//     document.getElementById(id).style.display = "block";
// }
// function closeModal(id) {
//     document.getElementById(id).style.display = "none";
// }

// // Mobile menu toggle
// document.getElementById("menuBtn").addEventListener("click", () => {
//     document.getElementById("navMenu").classList.toggle("hidden");
// });

// // Footer dates
// document.getElementById("currentyear").textContent = new Date().getFullYear();
// document.getElementById("lastModified").textContent = document.lastModified;

// ---------- Timestamp Filler ----------
window.addEventListener('DOMContentLoaded', () => {
    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        const now = new Date().toISOString();
        timestampField.value = now;
    }


    initModals();
    populateThankYouPage();
});


// ---------- Modal Handling ----------
function initModals() {
    const modalLinks = document.querySelectorAll('.card a[href^="#"]');
    const modals = document.querySelectorAll('.modal');


    modalLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const target = link.getAttribute('href');
            const modal = document.querySelector(target);
            if (modal) openModal(modal);
        });
    });


    modals.forEach(modal => {
        const closeBtn = modal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => closeModal(modal));
        }


        modal.addEventListener('click', e => {
            if (e.target === modal) closeModal(modal);
        });
    });


    // ESC key closes any open modal
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            document
                .querySelectorAll('.modal[data-visible="true"]')
                .forEach(modal => closeModal(modal));
        }
    });
}


function openModal(modal) {
    modal.dataset.visible = 'true';
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
    modal.focus();
}


function closeModal(modal) {
    modal.dataset.visible = 'false';
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
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