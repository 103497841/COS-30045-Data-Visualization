document.write('<nav>');
    document.write('<figure class="nav-img">'); //image
        document.write('<img src="images/swinburne_logo.png" alt="a">');
    document.write('</figure>');

    document.write('<div class="hamburger">'); //hamburger
        document.write('<span class="bar"></span>');
        document.write('<span class="bar"></span>');
        document.write('<span class="bar"></span>');
    document.write('</div>');

    document.write('<ul class="nav-main">'); //nav links
        document.write('<li>');
            document.write('<a href="index.html">Home</a>');
        document.write('</li>');
        document.write('<li>');
            document.write('<a href="lineSmoke.html">Average Consumption</a>');
        document.write('</li>');
        document.write('<li>');
            document.write('<a href="barSmoke.html">Gender-based Consumption</a>');
        document.write('</li>');
        document.write('<li>');
            document.write('<a href="pieSmoke.html">Proportion Status</a>');
        document.write('</li>');
    document.write('</ul>');
document.write('</nav>');

const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".nav-main");

hamburger.addEventListener("click", () => { //if clicked on hamburger
    hamburger.classList.toggle("active");
    nav.classList.toggle("active");
})

const currentPage = document.querySelectorAll(".nav-main li a"); //select all the nav items

currentPage.forEach((page) => {
    if (page.href === window.location.href) { //if nav item is equal to current page, set aria-current, css will highlight the nav item 
        page.setAttribute("aria-current", "page");
    }
});