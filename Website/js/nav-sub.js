document.write('<ul class="nav-sub">');
    document.write('<li>');
        document.write('<a href="pieSmoke.html">Smoking</a>');
    document.write('</li>');
    document.write('<li>');
        document.write('<a href="pieAlcohol.html">Alcohol</a>');
    document.write('</li>');
document.write('</ul>');

const currentPage2 = document.querySelectorAll(".nav-sub li a"); //select all the nav items

currentPage2.forEach((page) => {
    if (page.href === window.location.href) { //if nav item is equal to current page, set aria-current, css will highlight the nav item 
        page.setAttribute("aria-current", "page");
    }
});