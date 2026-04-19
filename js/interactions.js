const populateFilters = (data) => {
  const container = d3.select("#filters_screen");

  container.selectAll("button")
    .data(filters_screen)
    .join("button")
    .attr("class", "filter")
    .classed("active", d => d.isActive)
    .text(d => d.label)
    .on("click", (event, clickedFilter) => {
      if (!clickedFilter.isActive) {
        filters_screen.forEach(filter => {
          filter.isActive = filter.id === clickedFilter.id;
        });

        d3.selectAll("#filters_screen .filter")
          .classed("active", filter => filter.id === clickedFilter.id);

        let filteredData;

        if (clickedFilter.id === "all") {
          filteredData = data;
        } else {
          filteredData = data.filter(d => d.screenTech === clickedFilter.id);
        }

        updateHistogram(filteredData);
      }
    });
};

const createTooltip = () => {
  const tooltip = innerChartS.append("g")
    .attr("class", "tooltip")
    .style("opacity", 0);

  tooltip.append("rect")
    .attr("width", tooltipWidth)
    .attr("height", tooltipHeight)
    .attr("rx", 6)
    .attr("ry", 6)
    .attr("fill", barColor)
    .attr("opacity", 0.85);

  tooltip.append("text")
    .text("NA")
    .attr("x", tooltipWidth / 2)
    .attr("y", tooltipHeight / 2 + 2)
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .attr("fill", "white")
    .style("font-weight", 900);
};

const handleMouseEvents = () => {
  innerChartS.selectAll("circle")
    .on("mouseenter", (e, d) => {
      d3.select(".tooltip text")
        .text(d.screenSize);

      const cx = e.target.getAttribute("cx");
      const cy = e.target.getAttribute("cy");

      d3.select(".tooltip")
        .attr("transform", `translate(${cx - 0.5 * tooltipWidth}, ${cy - 1.5 * tooltipHeight})`)
        .transition()
        .duration(200)
        .style("opacity", 1);
    })
    .on("mouseleave", () => {
      d3.select(".tooltip")
        .style("opacity", 0)
        .attr("transform", "translate(0, 500)");
    });
};