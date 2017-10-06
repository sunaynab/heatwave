
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

  renderGraphs();

  const dropdown = d3.select("select").on("change", renderGraphs);

  function renderGraphs() {
    const e = d3.select("select")._groups[0][0].options;
    const selected = e[e.selectedIndex].value;


    if (selected === "CO2") {
      d3.select(".blurb").html("Carbon dioxide is released through activities such as burning fossil fuels, deforestation, respiration and volcanic eruptions. It is an important greenhouse gas that can contribute to rising global temperatures.");
      d3.select(".stat").html("in ppm");
      d3.select(".stat-header").html("Carbon Dioxide Levels");
      d3.select("input").attr("min", "1958").attr("max", "2017");
      d3.select("svg").remove();
      const line = d3.line()
        .x(d => (x(d.Year)))
        .y(d => (y(d.CO2)));

      const svg = d3.select(".seaLevels").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

      const focus = svg.append("g")
        .style("display", "none");

      const table = {};

      d3.csv("CO2.csv", (error, data) => {
        if (error) throw error;
        data.forEach (d => {
          d.Year = +d.Year;
          d.CO2 = +d.CO2;
          table[+d.Year] = +d.CO2;
        });

        x.domain([1958, 2017]);
        y.domain(d3.extent(data, (d => (d.CO2))));

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
          .attr("stroke", "#f47742")
          .attr("stroke-width", 2)
          .attr("fill", "none");

        focus.append("circle")
          .attr("class", "y")
          .style("fill", "#f47742")
          .attr("r", 4);

        svg.append("rect")
          .attr("width", width)
          .attr("height", height)
          .style("fill", "none")
          .style("pointer-events", "all")
          .on("mouseover", handleMouseOver)
          .on("mousemove", handleMouseMove);

          const input = d3.select("input")
          .on("change", handleSliderChange);

          function handleSliderChange() {
            const yr = input._groups[0][0].value;
            d3.select(".year").text("");
            d3.select(".seaLevel").text("");
            const year = d3.select(".year").append("text")
            .text(yr);
            const CO2 = d3.select(".seaLevel").append("text")
            .text(Math.round(table[yr]));
            focus.select("circle.y")
              .attr("transform", "translate (" + x(yr) + "," + y(table[yr]) + ")")
              .attr("display", null);
            d3.select(".value").text(yr);
          }


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
            const CO2 = d3.select(".seaLevel").append("text")
            .text(Math.round(d.CO2));

            focus.select("circle.y")
              .attr("transform", "translate (" + x(d.Year) + "," + y(d.CO2) + ")");

            d3.select(".value").text(d.Year);
            d3.select("input")._groups[0][0].value = d.Year;

          }

          function handleMouseOut () {
            focus.style("display", "none");
          }
      });
    }else if(selected === "Temp"){
      d3.select(".blurb").html("Of the 17 warmest years on record, 16 of them have occurred since 2001. One major factor that can contribute to increasing global temperatures include carbon dioxide levels.");
      d3.select("input").attr("min", "1880").attr("max", "2016");
      d3.select(".stat").html("in °C");
      d3.select(".stat-header").html("Global Average Temperature");
      d3.select("svg").remove();
      const line = d3.line()
        .x(d => (x(d.Year)))
        .y(d => (y(d.Temp)));

      const svg = d3.select(".seaLevels").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

      const focus = svg.append("g")
        .style("display", "none");

      const table = {};

      d3.csv("Temperature.csv", (error, data) => {
        if (error) throw error;
        data.forEach (d => {
          d.Year = +d.Year;
          d.Temp = +d.Temp;
          table[+d.Year] = +d.Temp;
        });

        x.domain([1880, 2016]);
        y.domain(d3.extent(data, (d => (d.Temp))));

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
          .attr("stroke", "#6132a3")
          .attr("stroke-width", 2)
          .attr("fill", "none");

        focus.append("circle")
          .attr("class", "y")
          .style("fill", "#6132a3")
          .attr("r", 4);

        svg.append("rect")
          .attr("width", width)
          .attr("height", height)
          .style("fill", "none")
          .style("pointer-events", "all")
          .on("mouseover", handleMouseOver)
          .on("mousemove", handleMouseMove);

          const input = d3.select("input")
          .on("change", handleSliderChange);

          function handleSliderChange() {
            const yr = input._groups[0][0].value;
            d3.select(".year").text("");
            d3.select(".seaLevel").text("");
            const year = d3.select(".year").append("text")
            .text(yr);
            const Temp = d3.select(".seaLevel").append("text")
            .text(table[yr]);
            focus.select("circle.y")
              .attr("transform", "translate (" + x(yr) + "," + y(table[yr]) + ")")
              .attr("display", null);
            d3.select(".value").text(yr);
          }


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
            const Temp = d3.select(".seaLevel").append("text")
            .text(d.Temp);

            focus.select("circle.y")
              .attr("transform", "translate (" + x(d.Year) + "," + y(d.Temp) + ")");

            d3.select(".value").text(d.Year);
            d3.select("input")._groups[0][0].value = d.Year;

          }

          function handleMouseOut () {
            focus.style("display", "none");
          }
      });
    }else{
      d3.select(".blurb").html("Two factors contribute to rising sea levels: increased volumes of water from melting ice sheets and glaciers and the expansion of water as it warms up. Data displayed is from 1880 to 2013.");
      d3.select(".stat").html("in mm");
      d3.select(".stat-header").html("Sea Level Change");
      d3.select("input").attr("min", "1880").attr("max", "2013");
      d3.select("svg").remove();
      const line = d3.line()
        .x(d => (x(d.Year)))
        .y(d => (y(d.seaLevels)));

      const svg = d3.select(".seaLevels").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

      const focus = svg.append("g")
        .style("display", "none");

      const table = {};

      d3.csv("sealevels.csv", (error, data) => {
        if (error) throw error;
        data.forEach (d => {
          d.Year = +d.Year;
          d.seaLevels = +d.seaLevels;
          table[+d.Year] = +d.seaLevels;
        });

        x.domain([1880, 2013]);
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
          .attr("stroke", "#41a9f4")
          .attr("stroke-width", 2)
          .attr("fill", "none");

        focus.append("circle")
          .attr("class", "y")
          .style("fill", "]")
          .style("fill", "#41a9f4")
          .attr("r", 4);

        svg.append("rect")
          .attr("width", width)
          .attr("height", height)
          .style("fill", "none")
          .style("pointer-events", "all")
          .on("mouseover", handleMouseOver)
          .on("mousemove", handleMouseMove);

          const input = d3.select("input")
          .on("change", handleSliderChange);

          function handleSliderChange() {
            const yr = input._groups[0][0].value;
            d3.select(".year").text("");
            d3.select(".seaLevel").text("");
            const year = d3.select(".year").append("text")
            .text(yr);
            const seaLevel = d3.select(".seaLevel").append("text")
            .text(Math.round(table[yr]));
            focus.select("circle.y")
              .attr("transform", "translate (" + x(yr) + "," + y(table[yr]) + ")")
              .attr("display", null);
            d3.select(".value").text(yr);
          }


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
      });
    }
}
