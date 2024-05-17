function init() {
    // var w = 500;
    // var h = 100;
    // var padding = 1;

    // var dataset = [20,7,15,12,21,9,13,5,19,24];

    // var svg = d3.select("#chart")
    //             .append("svg")
    //             .attr("width",w)
    //             .attr("height",h);

    // svg.selectAll("rect")
    //     .data(dataset)
    //     .enter()
    //     .append("rect")
    //     .attr("x",function(d,i) {
    //         return i * (w / dataset.length);
    //     })
    //     .attr("y",function(d) {
    //         return h - d * 4; //right side up
    //     })
    //     .attr("width",function(d,i) {
    //         return w / dataset.length - padding;
    //     })
    //     .attr("height",function(d) {
    //         return d * 4;
    //     })
    //     .style("fill",function(d,i) {
    //         return `rgb(50,150,${25*(i+1)})`;
    //     });
}

window.onload = init();