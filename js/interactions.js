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