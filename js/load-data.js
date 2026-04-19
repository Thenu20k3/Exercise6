d3.csv("data/Ex6_TVdata_withStar.csv").then(data => {

  data.forEach(d => {
    d.energyConsumption = +d.energyConsumption;
    d.star = +d.star;
    d.screenSize = +d.screenSize;
  });

  console.log(data);

  drawHistogram(data);
});