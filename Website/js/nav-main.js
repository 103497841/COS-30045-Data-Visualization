document.write('<nav>');
    document.write('<figure class="nav-img">');
        document.write('<img src="images/swinburne_logo.png" alt="a">');
    document.write('</figure>');

    document.write('<div class="hamburger">');
        document.write('<span class="bar"></span>');
        document.write('<span class="bar"></span>');
        document.write('<span class="bar"></span>');
    document.write('</div>');

    document.write('<ul class="nav-main">');
        document.write('<li>');
            document.write('<a href="index.html">Home</a>');
        document.write('</li>');
        document.write('<li>');
            document.write('<a href="barSmoke.html" >Bar Chart</a>');
        document.write('</li>');
        document.write('<li>');
            document.write('<a href="pieSmoke.html" >Pie Chart</a>');
        document.write('</li>');
        document.write('<li>');
            document.write('<a href="lineSmoke.html" >Line Chart</a>');
        document.write('</li>');
    document.write('</ul>');
document.write('</nav>');

const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".nav-main");

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