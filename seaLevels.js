import * as d3 from "./node_modules/d3";

  // set up size of line chart
  const margin = {top: 30, right: 30, bottom: 20, left: 40},
    width = 800 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

  const bisectYear = d3.bisector( d => { return d.Year; }).left;

  // Scales

  const x = d3.scaleLinear()
    .range([0, width]);


  const y = d3.scaleLinear()
    .range([height, 0]);

  // Create Axes

  const xAxis = d3.axisBottom()
    .scale(x)
    .tickFormat(d3.format("d"));

  const yAxis = d3.axisLeft()
    .scale(y);

  const line = d3.line()
    .x(d => (x(d.Year)))
    .y(d => (y(d.seaLevels)));

  export const svg = d3.select(".seaLevels").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

  const focus = svg.append("g")
    .style("display", "none");

  d3.csv("Data.csv", (error, data) => {
    if (error) throw error;
    data.forEach (d => {
      d.Year = +d.Year;
      d.seaLevels = +d.seaLevels;
    });

    x.domain(d3.extent(data, (d => (d.Year))));
    y.domain(d3.extent(data, (d => (d.seaLevels))));

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);

    const path = svg.append("path")
      .data([data])
      .attr("class", "line")
      .attr("d", line)
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr("fill", "none");

    focus.append("circle")
      .attr("class", "y")
      .style("fill", "steelblue")
      .attr("r", 4);

    svg.append("rect")
      .attr("width", width)
      .attr("height", height)
      .style("fill", "none")
      .style("pointer-events", "all")
      .on("mouseover", handleMouseOver)
      .on("mouseout", handleMouseOut)
      .on("mousemove", handleMouseMove);

      function handleMouseOver () {
        focus.style("display", null);
      }

      function handleMouseMove() {
        const x0 = x.invert(d3.mouse(this)[0]),
          i = bisectYear(data, x0, 1),
          d0 = data[i - 1],
          d1 = data[i],
          d = x0 - d0.Year > d1.Year - x0 ? d1 : d0;
        d3.select(".year").text("");
        d3.select(".seaLevel").text("");
        const year = d3.select(".year").append("text")
        .text(d.Year);
        const seaLevel = d3.select(".seaLevel").append("text")
        .text(Math.round(d.seaLevels));

        focus.select("circle.y")
          .attr("transform", "translate (" + x(d.Year) + "," + y(d.seaLevels) + ")");

        d3.select(".value").text(d.Year);
        d3.select("input")._groups[0][0].value = d.Year;

      }

      function handleMouseOut () {
        focus.style("display", "none");
      }

      // function handleSliderDrag () {
      //   d3.select(".year").text("");
      //   d3.select(".seaLevel").text("");
      //   const year = d3.select("input")._groups[0][0].value;
      //   d3.select(".year").append("text")
      //   .text(year);
      //   d3.select(".seaLevel").append("text")
      //   .text(Math.round(x.invert(year)));
      // }
  });
