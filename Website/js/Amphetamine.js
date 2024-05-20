function init() {
    d3.csv("csv/AusAmphetamine_C.csv").then(function(data) {
        // Amphetamine = [];
        // Year = [];
        
        const states = ["WA","NT","NSW","ACT","VIC","TAS","QLD","SA"] //page links for each states
        // console.log(window.location.pathname);

        const link_string = window.location.pathname;

        // data.forEach((element) => {
        //     Year.push(Date.parse(element["Year"]));
        // })

        a_boolean = true;
        i = 0;
        while (a_boolean) {
            if (link_string.includes(states[i])) { //check if current page match with state
                // data.forEach((element) => { //if true, get all data for the state
                //     Amphetamine.push(parseInt(element[states[i]])); //push data into array, parse into int for d3.max not to get confused
                // });
                data.forEach(function(d) {
                    d.Year = +d.Year;
                    d.Value = +d[states[i]];
                })
                a_boolean = false;
            }
            i++;
        }
        dataset = data;
        // console.log(Amphetamine);
        // console.log(d3.max(Amphetamine));

        // console.log(Year);

        barChart(dataset);
    })
}

function barChart(dataset) {
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
					.paddingInner(0.08); //generate a padding value of 5% of the band width

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

    var svg = d3.select("#chart")
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
        .style("fill",function(d,i) {
            return "blue";
        });

    svg.append("g") //draw X axis
        .attr("transform","translate(0, "+ (h) +")")
        .call(xAxis);

    svg.append("g") //draw Y axis
        .attr("transform","translate("+ (padding) +",0)")
        .call(yAxis);
}

window.onload = init();