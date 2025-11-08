//store the selected elements that will be used
const navbutton = document.querySelector('#ham-btn');
const navlinks = document.querySelector('#nav-bar');

//toggle the show class on and off
navbutton.addEventListener('click', () => {
    navbutton.classList.toggle('show');
    navlinks.classList.toggle('show');
});


