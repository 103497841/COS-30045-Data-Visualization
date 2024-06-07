function init() {
    const link_string = window.location.pathname;

    if (link_string.includes("Smoke")) { //Tobacco web page
        get_CSV_data("csv/SmokePerCapita.csv",1)
    } else if (link_string.includes("Alcohol")) { //Alcohol web page
        get_CSV_data("csv/AlcoholPerCapita.csv",1)
    }
}

function get_CSV_data(csv_link,chart_number) {
    d3.csv(csv_link).then(function(data) {
        total_data = [];

        Total = Object.keys(data[0])[1]; //get the dictonary key
        data.forEach(d => {
            d.Year = +d.Year;
            d.Total = +d[Total];

            total_data.push(parseInt(d[Total])); //bar chart (invisible, only for hovering purposes)
        });

        lineChart(data,chart_number,total_data,Total);
    })
}

function lineChart(dataset, chart_number, total_data, yText) {
    var w = 750;
    var h = 500;
    var padding = 50;

    var svg = d3.select(`#chart${chart_number}`)
                .append("svg")
                .attr("width",w + padding)
                .attr("height",h + padding);

    //line chart x scale
    xScale = d3.scaleLinear()
                .domain(d3.extent(dataset, d => d.Year))
                .range([padding, w]);

    //line chart y scale
    yScale = d3.scaleLinear()
                .domain([0,d3.max(dataset,function(d) {
                    return d.Total;
                })
                    ])
                .range([h-padding,0]);

    //line position
    line = d3.line()
            .x(function(d) {
                return xScale(d.Year);
            })
            .y(function(d) {
                return yScale(d.Total);
            });
    
    //line chart x axis
    xAxis = d3.axisBottom()
                .ticks(5)
                .tickFormat(d3.format("d")) //remove , in year (eg. 2,011 to 2011)
                .scale(xScale);

    //line chart y axis
    yAxis = d3.axisLeft()
                .ticks(10)
                .scale(yScale);

    //bar chart (invisible, only for hovering purposes)
    xBScale = d3.scaleBand() //ordinal scale
                .domain(d3.range(total_data.length)) //calculate the range of the domain
                .rangeRound([0,w]); //range + round numbers
    
    //bar chart (invisible, only for hovering purposes)
    yBScale = d3.scaleLinear() //quantitative
                .domain([0,d3.max(total_data)])
                .range([0,h]);

    //line chart
    svg.append("path")
        .datum(dataset)
        .attr("class","line")
        .attr("stroke","#88ccee")
        .style("stroke-width", "0.2em")
        .attr("transform","translate("+ padding/4 +","+ padding/2 +")")
        .attr("d",line);

    //bar chart (invisible, only for hovering purposes)
    svg.selectAll("rect")
		.data(total_data)
		.enter()
		.append("rect")
		.attr("x",function(d,i) {
			return xBScale(i)+padding/2+(2*i);
		})
		.attr("y",function(d) {
			return h - yBScale(d) - padding;
		})
		.attr("width", xBScale.bandwidth())
		.attr("height",function() {
            return padding*4; //area for hovering
		})
        .on("mouseover",function(d,i) {
            var xPosition = parseFloat(d3.select(this).attr("x")) + xBScale.bandwidth() / 2 - padding/6;
			var yPosition = parseFloat(d3.select(this).attr("y")) + padding*2.5;
		
			//tooltip label
			svg.append("text")
				.attr("id","tooltip")
				.attr("text-anchor","middle")
				.attr("x",xPosition)
				.attr("y",yPosition)
                .attr("fill","#88ccee")
                .style("font-size","1.5em")
				.text(`${dataset[i][yText]} ${yText}`);

            chartSideText(dataset[i].Year,dataset[i][yText],yText);
        })
        .on("mouseout",function() {
			d3.select("#tooltip").remove();
		})
		.attr("opacity",0);

    svg.append("g") //draw X axis
        .attr("transform","translate("+ padding/4 +","+ (h - padding/2) +")")
        .style("font-size","1em")
        .call(xAxis);

    svg.append("g") //draw Y axis
        .attr("transform","translate("+ (padding+padding/4) +","+ padding/2 +")")
        .style("font-size","1em")
        .call(yAxis);

    // X Axis label
    svg.append("text")
        .attr("text-anchor", "middle")
        .attr("x",w/2+padding/2)
        .attr("y",h+padding/2)
        .attr("fill","white")
        .style("font-weight","bold")
        .style("font-size","1.2em")
        .text("Year");

    // Y Axis label
    svg.append("text")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .attr("x", -w/3)
        .attr("y", padding/2)
        .attr("fill","white")
        .style("font-weight","bold")
        .style("font-size","1.2em")
        .text(yText);
}

function chartSideText(year,total,yText) { //side banner 1 (hover text)
    //triggers when chart is hovered
    document.getElementById("chart-side-year").innerHTML = `Year: ${year}`;
    document.getElementById("chart-side-total").innerHTML = `Total: ${total} ${yText}`;
}

window.onload = init();