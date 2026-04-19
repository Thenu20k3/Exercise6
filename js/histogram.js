let svg;
let innerChart;
let barsGroup;
let xAxisGroup;
let yAxisGroup;

function drawHistogram(data) {
  svg = d3.select("#histogram")
    .append("svg")
    .attr("viewBox", `0 0 ${width} ${height}`);

  innerChart = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  barsGroup = innerChart.append("g");

  xAxisGroup = innerChart.append("g")
    .attr("transform", `translate(0, ${innerHeight})`);

  yAxisGroup = innerChart.append("g");

  svg.append("text")
    .attr("x", width / 2)
    .attr("y", height - 5)
    .attr("text-anchor", "middle")
    .text("Labelled Energy Consumption (kWh/year)");

  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", 15)
    .attr("text-anchor", "middle")
    .text("Frequency");

  updateHistogram(data);
}

function updateHistogram(data) {
  const bins = binGenerator(data);

  const minEng = bins[0].x0;
  const maxEng = bins[bins.length - 1].x1;
  const binsMaxLength = d3.max(bins, d => d.length);

  xScale
    .domain([minEng, maxEng])
    .range([0, innerWidth]);

  yScale
    .domain([0, binsMaxLength])
    .range([innerHeight, 0])
    .nice();

  const bars = barsGroup.selectAll("rect")
    .data(bins);

  bars.enter()
    .append("rect")
    .merge(bars)
    .transition()
    .duration(600)
    .attr("x", d => xScale(d.x0))
    .attr("y", d => yScale(d.length))
    .attr("width", d => Math.max(0, xScale(d.x1) - xScale(d.x0) - 2))
    .attr("height", d => innerHeight - yScale(d.length))
    .attr("fill", barColor)
    .attr("stroke", bodyBackgroundColor);

  bars.exit().remove();

  xAxisGroup.transition().duration(600).call(d3.axisBottom(xScale));
  yAxisGroup.transition().duration(600).call(d3.axisLeft(yScale));
}