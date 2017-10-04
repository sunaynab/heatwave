// import * as d3 from "./node_modules/d3";

// set up size of line chart
const margin = {top: 10, right: 20, bottom: 10, left: 20},
  width = 1920 - margin.left - margin.right,
  height = 768 - margin.top - margin.bottom;

// Scales

const x = d3.scaleLinear()
  .range([0, width]);

const y = d3.scaleLinear()
  .range([height, 0]);

// Create Axes

const xAxis = d3.axisBottom()
  .scale(x);

const yAxis = d3.axisLeft()
  .scale(y);

const line = d3.line()
  .x(d => (x(d.year)))
  .y(d => (y(d.seaLevels)));

const svg = d3.select(".linechart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

d3.csv("Data.csv", (error, data) => {
  if (error) throw error;
  data.forEach (d => {
    d.year = +d.year;
    d.seaLevels = +d.seaLevels;
  });

  x.domain(d3.extent(data, (d => (d.year))));
  y.domain(d3.extent(data, (d => (d.user))));

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);

  svg.append("path")
    .data([data])
    .attr("class", "line")
    .attr("d", line);
});
