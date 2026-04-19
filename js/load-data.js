d3.csv("data/Ex6_TVdata_withStar.csv").then(data => {
  data.forEach(d => {
    d.energyConsumption = +d.energyConsumption;
    d.star = +d.star;
    d.screenSize = +d.screenSize;
    d.screenTech = d.screenTech;
  });

  drawHistogram(data);
  populateFilters(data);
  drawScatterplot(data);

  createTooltip();
  handleMouseEvents();
});