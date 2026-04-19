const drawScatterplot = (data) => {

  const svg = d3.select("#scatterplot")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`);

  innerChartS = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // scales
  xScaleS
    .domain([0, d3.max(data, d => d.star)])
    .range([0, innerWidth]);

  yScaleS
    .domain([0, d3.max(data, d => d.energyConsumption)])
    .range([innerHeight, 0]);

  colorScale
    .domain(["LED", "LCD", "OLED"]);

  // circles
  innerChartS.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xScaleS(d.star))
    .attr("cy", d => yScaleS(d.energyConsumption))
    .attr("r", 4)
    .attr("fill", d => colorScale(d.screenTech))
    .attr("opacity", 0.5);

  // x axis
  innerChartS.append("g")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(d3.axisBottom(xScaleS));

  // y axis
  innerChartS.append("g")
    .call(d3.axisLeft(yScaleS));

  // x label
  svg.append("text")
    .attr("x", width / 2)
    .attr("y", height - 5)
    .attr("text-anchor", "middle")
    .text("Star Rating");

  // y label
  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", 15)
    .attr("text-anchor", "middle")
    .text("Energy Consumption (kWh/year)");

  // legend
  const legend = svg.append("g")
    .attr("transform", `translate(${width - 120}, ${margin.top})`);

  colorScale.domain().forEach((tech, i) => {
    const row = legend.append("g")
      .attr("transform", `translate(0, ${i * 20})`);

    row.append("rect")
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", colorScale(tech));

    row.append("text")
      .attr("x", 20)
      .attr("y", 9)
      .text(tech);
  });
};