const margin = { top: 30, right: 30, bottom: 50, left: 70 };

const width = 800;
const height = 400;

const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

const xScale = d3.scaleLinear();
const yScale = d3.scaleLinear();

const barColor = "#666666";
const bodyBackgroundColor = "#fffaf0";

const binGenerator = d3.bin()
  .value(d => d.energyConsumption);

const filters_screen = [
  { id: "all", label: "All", isActive: true },
  { id: "LED", label: "LED", isActive: false },
  { id: "LCD", label: "LCD", isActive: false },
  { id: "OLED", label: "OLED", isActive: false }
];

// scatterplot scales
const xScaleS = d3.scaleLinear();
const yScaleS = d3.scaleLinear();
const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

// tooltip settings
const tooltipWidth = 65;
const tooltipHeight = 32;

// scatterplot inner chart reference
let innerChartS;