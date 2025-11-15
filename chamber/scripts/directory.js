// current year in footer
document.querySelector("#currentyear").textContent = new Date().getFullYear();

document.getElementById("lastModified").innerHTML = document.lastModified;

// === Fetch Members ===
const directory = document.querySelector("#directory");

async function loadMembers() {
    const response = await fetch("data/members.json");
    const members = await response.json();

    displayMembers(members);
}

function displayMembers(members) {
    directory.innerHTML = "";

    members.forEach(member => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} logo">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
        `;

        directory.appendChild(card);
    });
}

loadMembers();

// === View Toggle ===
document.querySelector("#gridBtn").addEventListener("click", () => {
    directory.classList.add("grid");
    directory.classList.remove("list");
});

document.querySelector("#listBtn").addEventListener("click", () => {
    directory.classList.add("list");
    directory.classList.remove("grid");
});


document.getElementById("menuBtn").addEventListener("click", () => {
    document.getElementById("navMenu").classList.toggle("hidden");
});
