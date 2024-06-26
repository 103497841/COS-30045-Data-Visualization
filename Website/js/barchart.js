function init() {
    const link_string = window.location.pathname;

    if (link_string.includes("Smoke")) { //Tobacco web page
        get_CSV_data("csv/SmokeAge14_2016.csv",1);
        get_CSV_data("csv/SmokeAge14_2019.csv",2);
        get_CSV_data("csv/SmokeAge14_2022.csv",3);
    } else if (link_string.includes("Alcohol")) { //Alcohol web page
        get_CSV_data("csv/AlcoholAge14_2016.csv",1);
        get_CSV_data("csv/AlcoholAge14_2019.csv",2);
        get_CSV_data("csv/AlcoholAge14_2022.csv",3);
    }
}

function get_CSV_data(csv_link,chart_number) {
    // Load the data
    d3.csv(csv_link).then(function(data) {
        // List of subgroups (gender)
        subgroups = ["Male", "Female"];

        // List of groups (statuses)
        groups = data.map(function(d) {
            return d.Status
        });

        barchart(subgroups, groups, data, chart_number);
    });
}

function barchart(subgroups, groups, data, chart_number) {
    w = 750;
    h = 500;
    padding = 50;

    // Append the SVG object to the body
    var svg = d3.select(`#chart${chart_number}`).append("svg")
                    .attr("width", w + padding)
                    .attr("height", h + padding)
                    .append("g");

    xScale = d3.scaleBand()
                .domain(groups)
                .range([padding, w])
                .padding([0.2]);

    yScale = d3.scaleLinear()
                .domain([0, d3.max(data, function(d) {
                    return Math.max(d.Male, d.Female)
                })])
                .range([h, 0]);

    // Scale for subgroup
    xSubgroup = d3.scaleBand()
                        .domain(subgroups)
                        .range([0, xScale.bandwidth()])
                        .paddingInner([0.1]);

    color = d3.scaleOrdinal()
                    .domain(subgroups)
                    .range(["#3366cc", "#cc3366"]);

    // Bars
    svg.append("g")
        .selectAll("g")
        .data(data)
        .enter()
        .append("g")
        .attr("transform", function(d) {
            return `translate(${xScale(d.Status)},${padding/10})`
        })
        .selectAll("rect")
        .data(function(d) {
            return subgroups.map(function(dd) {
                return ({status: d.Status, gender: dd, value: d[dd]})
            })
        })
        .enter()
        .append("rect")
        .attr("x", function(d) {
            return xSubgroup(d.gender)+padding;
        })
        .attr("y", function(d) {
            return yScale(d.value);
        })
        .attr("width", xSubgroup.bandwidth())
        .attr("height", function(d) {
            return h - yScale(d.value)
        })
        .attr("fill", function(d,i) {
            chartSideColor(d.gender,color(d.gender),i+1); //set the colors for the legend
            return color(d.gender)
        })
        .on("mouseover",function(d,i) {

			d3.select(this)
				.attr("fill","#f88379") //change the color of the chart when hovering
                .attr("stroke", "white")
                .style("stroke-width", "0.2em");

            //change the color of the legend when hovering
            document.getElementById(`chart-side-legend${i+1}`).style.background = "#f88379";

            chartSideText(d.gender,d.status,d.value);
        })
        .on("mouseout",function(d,i) {
			d3.select(this)
            .attr("fill", function(d) {
                return color(d.gender) //change back the color of the chart after hovering
            })
            .style("stroke-width", "0");

            //change back the color of the legend after hovering
            document.getElementById(`chart-side-legend${i+1}`).style.background = color(d.gender);
		});

    // draw X axis
    svg.append("g")
        .attr("transform", "translate("+ (padding) +","+ (h+padding/10) +")")
        .style("font-size","0.8em")
        .call(d3.axisBottom(xScale));

    // draw Y Axis
    svg.append("g")
        .attr("transform","translate("+ (padding*2) +","+ padding/10 +")")
        .style("font-size","0.8em")
        .call(d3.axisLeft(yScale));

    // X Axis label
    svg.append("text")
        .attr("text-anchor", "middle")
        .attr("x",w/2+padding)
        .attr("y",h+padding/1.1)
        .attr("fill","white")
        .style("font-weight","bold")
        .style("font-size","1.2em")
        .text("Smoking Status");

    // Y Axis label
    svg.append("text")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .attr("x", -w/3)
        .attr("y", padding/2)
        .attr("fill","white")
        .style("font-weight","bold")
        .style("font-size","1.2em")
        .text("Number of People");
}

function showChart(chart) {
    //set and reset data text at the side
    document.getElementById("chart-side-title").innerHTML = `${chart}`;
    document.getElementById("chart-side-gender").innerHTML = `Gender: `;
    document.getElementById("chart-side-status").innerHTML = `Status: `;
    document.getElementById("chart-side-total").innerHTML = `Total: `;

    //show or hide chart based on radio
    switch(true) {
        case ((chart == "Age 14+ Smoking 2016") || (chart == "Age 14+ Drinking 2016")):
            document.getElementById("chart1").style.display = "inline";
            document.getElementById("chart2").style.display = "none";
            document.getElementById("chart3").style.display = "none";
            break;

        case ((chart == "Age 14+ Smoking 2019") || (chart == "Age 14+ Drinking 2019")):
            document.getElementById("chart1").style.display = "none";
            document.getElementById("chart2").style.display = "inline";
            document.getElementById("chart3").style.display = "none";
            break;

        case ((chart == "Age 14+ Smoking 2022") || (chart == "Age 14+ Drinking 2022")):
            document.getElementById("chart1").style.display = "none";
            document.getElementById("chart2").style.display = "none";
            document.getElementById("chart3").style.display = "inline";
            break;
    }
}


function chartSideText(gender,status,total) { //side banner 1 (hover text)
    //triggers when chart is hovered
    document.getElementById("chart-side-gender").innerHTML = `Gender: ${gender}`;
    document.getElementById("chart-side-status").innerHTML = `Status: ${status}`;
    document.getElementById("chart-side-total").innerHTML = `Total: ${total}`;
}

function chartSideColor(text,color,num) { //side banner 2 (legend)
    document.getElementById(`chart-side-legend${num}`).innerHTML = `${text}`;
    document.getElementById(`chart-side-legend${num}`).style.background = color;
}

window.onload = init();