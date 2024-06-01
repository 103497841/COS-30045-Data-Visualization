function init() {

    //csv file link, chart number
    get_CSV_data("csv/AusAmphetamine.csv",1);

    get_CSV_data("csv/AusCannabis.csv",2);

    get_CSV_data("csv/AusNonOpioids.csv",3);

    get_CSV_data("csv/AusOpioid.csv",4);
}

function get_CSV_data(csv_link,chart_number) {
    d3.csv(csv_link).then(function(data) {
        
        const states = ["WA","NT","NSW","ACT","VIC","TAS","QLD","SA"] //page links for each states

        const link_string = window.location.pathname; //get the path name of the current page

        loop = states.length; //for while loop
        i = 0; //for looping array
        while (loop > i) {
            if (link_string.includes(states[i])) { //check if current page match with state
                data.forEach(function(d) { //if true, get all data for the year and a state
                    d.Year = +d.Year;
                    d.Value = +d[states[i]];
                })
            }
            i++; //add 1 for looping through array 
        }
        dataset = data;

        barChart(dataset,chart_number);
    })
}

function barChart(dataset,chart_number) {
    var w = 500;
    var h = 500;
    var padding = 50;

    var Year = dataset.map(function(d) {
        return d.Year;
      });
  
    var Amphetamine = dataset.map(function(d) {
        return d.Value;
      });

    var xScale = d3.scaleBand() //ordinal scale
					.domain(Year) //calculate the range of the domain
					.rangeRound([padding,w]) //range + round numbers
					.paddingInner(0.08); //padding between the bar

	var yScale = d3.scaleLinear() //quantitative
					.domain([0,d3.max(Amphetamine)])
					.range([0,h]);

    var yScaleForAxis = d3.scaleLinear() //quantitative
					.domain([0,d3.max(Amphetamine)])
					.range([h,0]);
    
    var xAxis = d3.axisBottom()
                    .ticks(10)
                    .scale(xScale);

    var yAxis = d3.axisLeft()
                    .ticks(10)
                    .scale(yScaleForAxis);

    var svg = d3.select(`#chart${chart_number}`)
                .append("svg")
                .attr("width",w+padding)
                .attr("height",h+padding);

    svg.selectAll("rect")
        .data(Amphetamine)
        .enter()
        .append("rect")
        .attr("x",function(d,i) {
			return xScale(Year[i]);
		})
		.attr("y",function(d) {
			return h - yScale(d);
		})
		.attr("width", xScale.bandwidth())
		.attr("height",function(d) {
			return yScale(d);
		})
        .attr("fill","rgb(60,75,150)")
        .on("mouseover",function(d,i) {
            var xPosition = parseFloat(d3.select(this).attr("x")) + xScale.bandwidth() / 2;
			var yPosition = parseFloat(d3.select(this).attr("y")) + 16;
		
			//tooltip label
			svg.append("text")
				.attr("id","tooltip")
				.attr("text-anchor","middle")
				.attr("x",xPosition)
				.attr("y",yPosition)
				.text(d);

			d3.select(this)
				.attr("fill","orange");

            chartSideText(d,i+2015);
        })
        .on("mouseout",function(d) {
			d3.select("#tooltip").remove();
			d3.select(this).attr("fill","rgb(60,75,150)")
		});

    svg.append("g") //draw X axis
        .attr("transform","translate(0, "+ (h) +")")
        .call(xAxis);

    svg.append("g") //draw Y axis
        .attr("transform","translate("+ (padding) +",0)")
        .call(yAxis);
}

window.onload = init();


function showChart(chart) {
    //set and reset data text at the side
    document.getElementById("chart-drug").innerHTML = `Drug: ${chart}`;
    document.getElementById("chart-year").innerHTML = `Year: `;
    document.getElementById("chart-total").innerHTML = `Total: `;

    //show or hide chart based on radio
    switch(chart) {
        case "Amphetamine":
            document.getElementById("chart1").style.display = "inline";
            document.getElementById("chart2").style.display = "none";
            document.getElementById("chart3").style.display = "none";
            document.getElementById("chart4").style.display = "none";
            break;

        case "Cannabis":
            document.getElementById("chart1").style.display = "none";
            document.getElementById("chart2").style.display = "inline";
            document.getElementById("chart3").style.display = "none";
            document.getElementById("chart4").style.display = "none";
            break;

        case "Non-Opioids":
            document.getElementById("chart1").style.display = "none";
            document.getElementById("chart2").style.display = "none";
            document.getElementById("chart3").style.display = "inline";
            document.getElementById("chart4").style.display = "none";
            break;

        case "Opioids":
            document.getElementById("chart1").style.display = "none";
            document.getElementById("chart2").style.display = "none";
            document.getElementById("chart3").style.display = "none";
            document.getElementById("chart4").style.display = "inline";

            break;
    }
}


function chartSideText(d,i) {
    //triggers when chart is hovered
    document.getElementById("chart-year").innerHTML = `Year: ${i}`;
    document.getElementById("chart-total").innerHTML = `Total: ${d}`;
}