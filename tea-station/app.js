// Declaring the variable

const navBtn = document.getElementById("nav-btn");
const navClose = document.getElementById("nav-close");
const navBar = document.getElementById("navbar");
const navLink = document.getElementById("nav-link");


// Code to show the nav bar

navBtn.addEventListener("click", () => {

  navBar.classList.add("showNav");

});

// Code to remove navbar

navClose.addEventListener("click", () => {

  navBar.classList.remove("showNav");

});

// Code to remove navbar on clicking id

navLink.addEventListener("click", () => {

  navBar.classList.remove("showNav");

});