var dataBarChart = [];
var svg = 0;

function drawBarChart() {

  if (svg != 0) {
    svg.selectAll('*').remove();
  }

  // set the dimensions of the canvas
  var margin = {top: 20, right: 20, bottom: 70, left: 40},
      width = 600 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom;

  // set the ranges
  var x = d3.scale.linear().range([0, width]).domain([0,24]);
  var yt = d3.scale.linear().range([height, 0]).domain([15,24]);
  var yh = d3.scale.linear().range([height, 0]).domain([50,60]);

  // define the axis
  var xAxis = d3.svg.axis().scale(x).orient("bottom");
  var ytAxis = d3.svg.axis().scale(yt).orient("left");
  var yhAxis = d3.svg.axis().scale(yh).orient("right");

  // add the SVG element
  svg = d3.select("#visualisation").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g") .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Add axis
  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);
  svg.append("g")
    .attr("class", "y axis")
    .call(ytAxis); 
  svg.append("g")       
    .attr("class", "y axis")  
    .attr("transform", "translate(" + width + " ,0)") 
    .call(yhAxis);


  // Add temperature bar chart
  svg.selectAll("bar")
    .data(dataBarChart)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return x(d.hour); })
    .attr("width", 3)
    .attr("y", function(d) { return yt(d.temp); })
    .attr("height", function(d) { return height - yt(d.temp); });

  // Add humidity line
  var humLine = d3.svg.line()
    .x(function(d) { return x(d.hour); })
    .y(function(d) { return yh(d.hum); })
    .interpolate("basis");

  svg.append("path")
    .style("stroke", "red")
    .attr("d", humLine(dataBarChart))
    .attr('stroke-width', 2)
    .attr('fill', 'none');
};
