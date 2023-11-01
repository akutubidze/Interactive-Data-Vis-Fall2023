/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * .8;
height = window.innerHeight * .8;
margin = { top: 20, bottom: 60, left: 60, right: 40 };
// padding = { top: 10, bottom: 40, left: 40, right: 20 };
const minRadius = 0;
const maxRadius = 90;
// radius = 4;

/* LOAD DATA */
d3.csv("../data/MoMA_distributions.csv", d3.autoType)
  .then(data => {


    /* SCALES */
    const xScale = d3.scaleLinear()
      .domain([0, 1000])
      .range([margin.left, width - margin.right])

    const yScale = d3.scaleLinear()
      .domain([0, 320])
      .range([height - margin.bottom, margin.top])


    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    const artistLifespanScale = d3.scaleSqrt()
      .domain([0, d3.max(data, d => d['Artist Lifespan'])])
      .range([minRadius, maxRadius]);

    /* HTML ELEMENTS */



    // SVG
    const svg = d3.select("#container")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("background-color", "aliceblue")
      .style("overflow", "visible")


    // AXIS SCALE? // ეს რომ დავამატე სქეილს გამოჩნდა, დაუკავშირდა ზედა სქეილს
    svg.append("g")
      .attr("transform", `translate(${0},${height - margin.bottom})`)
      .call(selection => selection.call(xAxis))

    svg.append("g")
      .attr("transform", `translate(${margin.left},${0})`)
      .call(selection => selection.call(yAxis))

    svg.selectAll("circle.senator")
      .data(data, d => d.Title)
      .join("circle")
      .attr("class", "senator")
      .attr("id", d => d.Title)
      .attr("r", d => artistLifespanScale(d['Artist Lifespan']) / 4)
      .attr("cx", d => xScale(d['Length (cm)']))
      .attr("cy", d => yScale(d['Width (cm)']))
      .style("fill", "green")
      .style("stroke", "green")
      .style("stroke-width", 1)
      .style("fill-opacity", 0.7);


  });