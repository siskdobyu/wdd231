// current year in footer
document.querySelector("#currentyear").textContent = new Date().getFullYear();

document.getElementById("lastModified").innerHTML = document.lastModified;

//Export Interests
import { places } from "../data/places.mjs";

const showhere = document.querySelector("#cards-container");

function displayItems(places) {
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

