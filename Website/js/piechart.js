function init() {
    const link_string = window.location.pathname;

    if (link_string.includes("Smoke")) { //Tobacco web page
        get_CSV_data("csv/MSmoke2016.csv",1);
        get_CSV_data("csv/MSmoke2019.csv",2);
        get_CSV_data("csv/MSmoke2022.csv",3);
        get_CSV_data("csv/FSmoke2016.csv",4);
        get_CSV_data("csv/FSmoke2019.csv",5);
        get_CSV_data("csv/FSmoke2022.csv",6);
    } else if (link_string.includes("Alcohol")) { //Alcohol web page
        get_CSV_data("csv/MAlcohol2016.csv",1);
        get_CSV_data("csv/MAlcohol2019.csv",2);
        get_CSV_data("csv/MAlcohol2022.csv",3);
        get_CSV_data("csv/FAlcohol2016.csv",4);
        get_CSV_data("csv/FAlcohol2019.csv",5);
        get_CSV_data("csv/FAlcohol2022.csv",6);
    }
}


function get_CSV_data(csv_link,chart_no) {
    d3.csv(csv_link).then(function(data) {
        dataset = {};

        loop = data.length; //for while loop
        i = 0; //for looping array
        while (loop > i) {
            data.forEach(function() { //if true, get all data for the year and a state
                Status = data[i].Status;
                dataset[Status] = +data[i].Total;
            })
            i++; //add 1 for looping through array 
        }

        piechart(dataset,chart_no);
    })
}

function piechart(dataset,chart_no) {
    var w = 700;
    var h = 700;
    var padding = 50;
    var outerRadius = Math.min(w, h) / 2 - padding; //size of circle
    var innerRadius = w/6; //size of inner circle, make circle a donut

    // var dataset = [5, 10, 20, 45, 6, 25, 60];

    
    var color = d3.scaleOrdinal(d3.schemeCategory10); //colours

    var svg = d3.select(`#chart${chart_no}`)
                .append("svg")
                .attr("width", w)
                .attr("height", h)
                .append("g")
                .attr("transform", "translate(" + w/2 + "," + h/2 + ")"); //center chart

    var arc = d3.arc()
                .outerRadius(outerRadius)
                .innerRadius(innerRadius);

    var pie = d3.pie()
        .value(function(d) {
            return d.value;
        })
        .sort(function(a, b) { //same order as per csv file
            return d3.ascending(a.key,0);
        })
        .padAngle(0.015);

    // map data
    var g = svg.selectAll("path")
        .data(pie(d3.entries(dataset)));
        
    g.enter() //pie chart
        .append('path')
        .attr('d',function(d,i) {
            return arc(d,i);
        })
        .attr('fill', function(d,i){
            chartSideColor(d.data.key,color(d.data.key),i+1); //set the colors for the legend
            return(color(d.data.key))
        })
        .on("mouseover",function(d,i) {
			d3.select(this)
                .attr("fill","#f88379") //change the color of the chart when hovering
                .attr("stroke", "white")
                .style("stroke-width", "0.2em");

            //change the color of the legend when hovering
            document.getElementById(`chart-side-legend${i+1}`).style.background = "#f88379";

            chartSideText(d.data.key, d.data.value); //return to create hover data text, data value
        })
        .on("mouseout",function(d,i) {
			d3.select(this)
            .attr("fill", function(d){
                return(color(d.data.key)) //change back the color of the chart after hovering
            })
            .style("stroke-width", "0");;

            //change back the color of the legend after hovering
            document.getElementById(`chart-side-legend${i+1}`).style.background = color(d.data.key);
		})

    g.enter() //pie chart data text
        .append("text")
        .attr("text-anchor","middle")
        .text(function(d) {
            return `${d.data.value}%`;
        })
        .attr("fill","white")
        .style("font-size","1.2em")
        .attr("transform",function(d) {
            var c = arc.centroid(d);
            return "translate(" + c[0]*1.55 +"," + c[1]*1.55 + ")";
        });
}

function showChart(chart) {
    //set and reset data text at the side
    document.getElementById("chart-side-title").innerHTML = `${chart}`;
    document.getElementById("chart-side-status").innerHTML = `Status: `;
    document.getElementById("chart-side-total").innerHTML = `Total: `;

    //show or hide chart based on radio
    switch(true) {
        case ((chart == "Male Smoking 2016") || (chart == "Male Drinking 2016")):
            document.getElementById("chart1").style.display = "inline";
            document.getElementById("chart2").style.display = "none";
            document.getElementById("chart3").style.display = "none";
            document.getElementById("chart4").style.display = "none";
            document.getElementById("chart5").style.display = "none";
            document.getElementById("chart6").style.display = "none";
            break;

        case ((chart == "Male Smoking 2019") || (chart == "Male Drinking 2019")):
            document.getElementById("chart1").style.display = "none";
            document.getElementById("chart2").style.display = "inline";
            document.getElementById("chart3").style.display = "none";
            document.getElementById("chart4").style.display = "none";
            document.getElementById("chart5").style.display = "none";
            document.getElementById("chart6").style.display = "none";
            break;

        case ((chart == "Male Smoking 2022") || (chart == "Male Drinking 2022")):
            document.getElementById("chart1").style.display = "none";
            document.getElementById("chart2").style.display = "none";
            document.getElementById("chart3").style.display = "inline";
            document.getElementById("chart4").style.display = "none";
            document.getElementById("chart5").style.display = "none";
            document.getElementById("chart6").style.display = "none";
            break;

        case ((chart == "Female Smoking 2016") || (chart == "Female Drinking 2016")):
            document.getElementById("chart1").style.display = "none";
            document.getElementById("chart2").style.display = "none";
            document.getElementById("chart3").style.display = "none";
            document.getElementById("chart4").style.display = "inline";
            document.getElementById("chart5").style.display = "none";
            document.getElementById("chart6").style.display = "none";
            break;

        case ((chart == "Female Smoking 2019") || (chart == "Female Drinking 2019")):
            document.getElementById("chart1").style.display = "none";
            document.getElementById("chart2").style.display = "none";
            document.getElementById("chart3").style.display = "none";
            document.getElementById("chart4").style.display = "none";
            document.getElementById("chart5").style.display = "inline";
            document.getElementById("chart6").style.display = "none";
            break;

        case ((chart == "Female Smoking 2022") || (chart == "Female Drinking 2022")):
            document.getElementById("chart1").style.display = "none";
            document.getElementById("chart2").style.display = "none";
            document.getElementById("chart3").style.display = "none";
            document.getElementById("chart4").style.display = "none";
            document.getElementById("chart5").style.display = "none";
            document.getElementById("chart6").style.display = "inline";
            break;
    }
}


function chartSideText(status,total) { //side banner 1 (hover text)
    //triggers when chart is hovering chart
    document.getElementById("chart-side-status").innerHTML = `Status: ${status}`;
    document.getElementById("chart-side-total").innerHTML = `Total: ${total}%`;
}

function chartSideColor(text,color,num) { //side banner 2 (legend)
    document.getElementById(`chart-side-legend${num}`).innerHTML = `${text}`;
    document.getElementById(`chart-side-legend${num}`).style.background = color;
}

window.onload = init();