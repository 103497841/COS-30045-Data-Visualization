const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector("nav");

hamburger.addEventListener("click", () => {
    console.log("hi");
    hamburger.classList.toggle("active");
    nav.classList.toggle("active");
})

const currentPage = document.querySelectorAll(".nav-main li a"); //select all the nav items

currentPage.forEach((page) => {
    if (page.href === window.location.href) { //if nav item is equal to current page, set aria-current, css will highlight the nav item 
        page.setAttribute("aria-current", "page");
    }
});