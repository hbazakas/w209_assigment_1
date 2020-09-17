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


var x = d3.scaleLinear().range([0, iwidth]);
var y = d3.scaleLinear().range([iheight, 0]);
var color = d3.scaleOrdinal(d3.schemeCategory10);

function update(myData) {

  // TODO Update scale domains based on your data variables
  x.domain([0, 30.86]);
  y.domain([0, 43]);

  gDrawing
    .append("g")
    .call(d3.axisTop(x))
    .append("text")
    .style("fill", "black")
    .style("font-size", "12pt")
    .text("Distance")
    .attr("transform", `translate(${iwidth}, ${20})`);

  var marks = gDrawing.selectAll(".mark").data(myData);

  // Update
  marks;
  //TODO change the attribs/style of your updating mark
  var types = ["ride", "walk", "run", "hike"]
  color.domain(types);

  // Newly created elements
  marks.enter().append("rect")
       .attr("class", "mark")
       .attr("x", 0)
       .attr("y", function(d,i) {return y(i)-15;})
       .attr("height", barheight)
       .attr("width", function(d) {return x(d.distance);})
       .attr("fill", function(d) {return color(d.type);})
       .attr("stroke", "black")
       .attr("stroke-width", "1px")
       .attr("rx", 3)
       .attr("ry", 3);

  marks.enter().append("text").attr("class", "mark")
       .attr("x", function(d){return x(d.distance);})
       .attr("y", function(d,i) {return y(i)-10+barheight/2;})
       .attr("dx", ".35em")
       .text(function(d) {
             return d.type + " - " + d.elevation + "feet";});

  marks.enter().append("text").attr("class", "mark")
       .attr("x", 0})
       .attr("y", function(d,i) {return y(i)-10+barheight/2;})
       .attr("dx", ".35em")
       .text(function(d) {
              return d.date;});
         // TODO change for the mark you want to use e.g. rect, path, etc
  //TODO change the attribs/style of your updating mark

  // Elements to remove
  marks.exit().remove();
}

d3.csv("./data/strava_data.csv", update);
