var dataBarChart = [];
var svg = 0;

function drawBarChart() {

  if (svg != 0) {
    svg.selectAll('*').remove();
  }

  // set the dimensions of the canvas
  var margin = {top: 40, right: 60, bottom: 40, left: 60},
      width = 600,
      height = 300;
      fWidth = width + margin.left + margin.right;
      fHeight = height + margin.top + margin.bottom;

  // define min/max of data set
  tempMin = d3.min(dataBarChart, function(d) { return Math.min(d.temp); });
  tempMax = d3.max(dataBarChart, function(d) { return Math.max(d.temp); });
  diffT = tempMax - tempMin;
  humMin = d3.min(dataBarChart, function(d) { return Math.min(d.hum); });
  humMax = d3.max(dataBarChart, function(d) { return Math.max(d.hum); });
  diffH = humMax - humMin;

  // set the ranges
  var x = d3.scale.linear().range([margin.left, fWidth-margin.right]).domain([0,24]);
  var yt = d3.scale.linear().range([fHeight-margin.bottom, margin.top]).domain([tempMin-diffT/8, tempMax+diffT/8]);
  var yh = d3.scale.linear().range([fHeight-margin.bottom, margin.top]).domain([humMin-diffH/8, humMax+diffH/8]);



  // define the axis
  var xAxis = d3.svg.axis().scale(x).orient("bottom");
  var ytAxis = d3.svg.axis().scale(yt).orient("left");
  var yhAxis = d3.svg.axis().scale(yh).orient("right");

  // add the SVG element
  svg = d3.select("#visualisation").append("svg")
    .attr("width", fWidth)
    .attr("height", fHeight)
    .append("g");

  // Add axis
  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0,"+ (fHeight-margin.bottom) +")")
    .call(xAxis);
  svg.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate("+ margin.left +",0)")
    .call(ytAxis); 
  svg.append("g")       
    .attr("class", "y axis")  
    .attr("transform", "translate("+ (fWidth-margin.right) +",0)") 
    .call(yhAxis);

  // Add titles for axis
  svg.append("text")
    .attr("text-anchor", "middle")
    .attr("transform", "translate("+ margin.left/4 +","+margin.top+")rotate(-90)")
    .text("T (°C)");

  svg.append("text")
    .attr("text-anchor", "middle")
    .attr("transform", "translate("+ (fWidth-margin.right/4) +","+margin.top+")rotate(-90)")
    .text("RH (%)");

  svg.append("text")
    .attr("text-anchor", "middle")
    .attr("transform", "translate("+ (fWidth-margin.right) +","+(fHeight-margin.bottom/4)+")")
    .text("Time (h)");


  // Add temperature bar chart
  svg.selectAll("bar")
    .data(dataBarChart)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return x(d.hour); })
    .attr("width", 3)
    .attr("y", function(d) { return yt(d.temp); })
    .attr("height", function(d) { return fHeight - margin.bottom - yt(d.temp); });

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
