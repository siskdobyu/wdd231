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
            <img src="finalproject/images/${member.image}" alt="${member.name} logo" loading="lazy">
            <h3>${member.name}</h3>
            <p>${member.phone}</p>
            <a href="${member.link}" target="_blank">Link</a>
        `;

        directory.appendChild(card);
    });
}

loadMembers();

