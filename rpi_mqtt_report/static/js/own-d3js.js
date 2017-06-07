var vis = d3.select("#visualisation"),

    WIDTH = 1000,
    HEIGHT = 500,

    MARGINS = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 50
    },

    xScale = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([0,23]);
    yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([5,30]);

  xAxis = d3.svg.axis()
  .scale(xScale);

  yAxis = d3.svg.axis()
  .scale(yScale)
  .orient("left");

  vis.append("svg:g")
  .attr("class","axis")
  .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
  .call(xAxis);

  vis.append("svg:g")
  .attr("class","axis")
  .attr("transform", "translate(" + (MARGINS.left) + ",0)")
  .call(yAxis);

var lineGen = d3.svg.line()
  .x(function(d) {
    return xScale(d.hour);
  })
  .y(function(d) {
  return yScale(d.temp);
})
.interpolate("basis");

vis.append('svg:path')
.attr('d', lineGen(data))
.attr('stroke', 'green')
.attr('stroke-width', 2)
.attr('fill', 'none');
