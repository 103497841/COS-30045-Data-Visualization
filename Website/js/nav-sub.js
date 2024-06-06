const link_string = window.location.pathname;

document.write('<ul class="nav-sub">');
    if (link_string.includes("bar")) {
        document.write('<li>');
            document.write('<a href="barSmoke.html">Smoking</a>');
        document.write('</li>');
        document.write('<li>');
            document.write('<a href="barAlcohol.html">Alcohol</a>');
        document.write('</li>');
    } else if (link_string.includes("pie")) {
        document.write('<li>');
            document.write('<a href="pieSmoke.html">Smoking</a>');
        document.write('</li>');
        document.write('<li>');
            document.write('<a href="pieAlcohol.html">Alcohol</a>');
        document.write('</li>');
    }
document.write('</ul>');

const currentPage2 = document.querySelectorAll(".nav-sub li a"); //select all the nav items

currentPage2.forEach((page) => {
    if (page.href === window.location.href) { //if nav item is equal to current page, set aria-current, css will highlight the nav item 
        page.setAttribute("aria-current", "page");
    }
});