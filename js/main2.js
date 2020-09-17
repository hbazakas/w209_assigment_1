var width = 800;
var height = 1000;
var svg = d3
    .select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height)

var margin = { top: 30, right: 100, bottom: 30, left: 30 };
var iwidth = width - margin.left - margin.right;
var iheight = height - margin.top - margin.bottom;

var barheight = iheight/43;
var barwidth = iwidth/43

var gDrawing = svg
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


var x = d3.scaleLinear().domain([0, 30.86]).range([0, iwidth]);
var y = d3.scaleLinear().domain([0, 43]).range([iheight, 0]);
var color = d3.scaleOrdinal(d3.schemeCategory10);

var data = d3.csv("./data/strava_data.csv");

var bars = svg.selectAll("rect").data(data)
    .enter()
    .append("rect")
    .attr("x", 0)
    .attr("y", function(d,i) {return y(i)-15;})
    .attr("height", barheight)
    .attr("width", function(d) {return x(d.distance);})
    .attr("fill", function(d) {return color(d.type);})
    .attr("stroke", "black")
    .attr("stroke-width", "1px")
    .attr("rx", 3)
    .attr("ry", 3);



console.log(data);
