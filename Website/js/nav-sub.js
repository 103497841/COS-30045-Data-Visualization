document.write('<ul class="nav-sub">');
    document.write('<li>');
        document.write('<a href="WA.html">WA</a>');
    document.write('</li>');
    document.write('<li>');
        document.write('<a href="NT.html" >NT</a>');
    document.write('</li>');
    document.write('<li>');
        document.write('<a href="NSW.html" >NSW</a>');
    document.write('</li>');
    document.write('<li>');
        document.write('<a href="ACT.html">ACT</a>');
    document.write('</li>');
    document.write('<li>');
        document.write('<a href="VIC.html" >VIC</a>');
    document.write('</li>');
    document.write('<li>');
        document.write('<a href="TAS.html" >TAS</a>');
    document.write('</li>');
    document.write('<li>');
        document.write('<a href="QLD.html">QLD</a>');
    document.write('</li>');
    document.write('<li>');
        document.write('<a href="SA.html" >SA</a>');
    document.write('</li>');
document.write('</ul>');

const currentPage2 = document.querySelectorAll(".nav-sub li a"); //select all the nav items

currentPage2.forEach((page) => {
    if (page.href === window.location.href) { //if nav item is equal to current page, set aria-current, css will highlight the nav item 
        page.setAttribute("aria-current", "page");
    }
});