function init() {
    // Select the SVG element
    const svg = d3.select("#container");

    // Load the SVG file
    d3.svg("Australia_states_blank.svg")
        .then(data => {
            // Append the loaded SVG to the DOM
            // loadedSVG = svg.node().append(data.documentElement);
            const loadedSVG = data.documentElement;

            i = 0; //cycle through the 'states' array
            const states = ["WA.html","NT.html","NSW.html","ACT.html","VIC.html","TAS.html","QLD.html","SA.html"] //page links for each states

            d3.select(loadedSVG)
                .selectAll("svg g g")
                .each(function() {
                    const visual = d3.select(this);
                    const link = visual.append("a") //add anchor to each visual element
                                    .attr("href", states[i]);

                    link.append(() => visual.node().cloneNode(true));

                    link.select("g") //hover effects
                        .on("mouseover",function() {
                            d3.select(this)
                                .select("*")
                                .style("fill","red");
                        })
                        .on("mouseout",function() {
                            d3.select(this)
                                .select("*")
                                .style("fill","#b3b3b3");
                        });

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