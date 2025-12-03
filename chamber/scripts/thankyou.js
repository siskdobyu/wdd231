// ---------------------
// FOOTER DATES
// ---------------------
document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = document.lastModified;

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
        { param: 'businessName', id: 'out-organization' },
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
