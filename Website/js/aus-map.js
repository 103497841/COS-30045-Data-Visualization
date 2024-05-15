function init() {
    // Select the SVG element
    const svg = d3.select("#container");

    // Load the SVG file
    d3.svg("Australia_states_blank.svg")
        .then(data => {
            // Append the loaded SVG to the DOM
            // loadedSVG = svg.node().append(data.documentElement);
            const loadedSVG = data.documentElement;

            // loadedSVG.setAttribute("viewBox", "0 0 300 300");

            i = 0;
            const states = ["WA.html","NT.html","NSW.html","ACT.html","VIC.html","TAS.html","QLD.html","SA.html"]

            d3.select(loadedSVG)
                .selectAll("svg g g")
                .each(function() {
                    const visual = d3.select(this);
                    const link = visual.append("a")
                                    .attr("href", states[i]);

                    link.append(() => visual.node().cloneNode(true));

                    console.log(i);
                    i++;
                });
            svg.node().append(loadedSVG);
        })
        .catch(error => {
            console.error('Error loading SVG:', error);
        });
}

window.onload = init;