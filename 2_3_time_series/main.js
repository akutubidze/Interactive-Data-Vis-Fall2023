/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.7,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 70, left: 100, right: 60 }

/* LOAD DATA */
d3.csv(['../data/Gini_USA.csv'], (d) => {

  return {
    Year: new Date(d.year),
    state: d.country_name,
    gini: +d.value

  }
}).then(data => {

  // // SCALES
  const xScale = d3.scaleTime()

    .domain(d3.extent(data.sort((a, b) => {
      return new Date(a.Year) - new Date(b.Year)
    }), d => new Date(d.Year)))

    .range([margin.left, width - margin.right])

  const yScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.gini))
    .range([height - margin.bottom, margin.top])

  // // CREATE SVG ELEMENT
  const svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)

  // // BUILD AND CALL AXES

  svg.append('g')
    .attr(`transform`, `translate(0, ${height - margin.bottom})`)
    .call(d3.axisBottom(xScale))

  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", 0 - height / 2)
    .attr("y", 55)
    .style("text-anchor", "middle")
    .text("GINI Index");

  svg.append("text")
    .attr("x", (width / 2))
    .attr("y", height - margin.bottom + 40)
    .style("text-anchor", "middle")
    .text("Year");

  svg.append("text")
    .attr("x", (width / 2))
    .attr("y", height - margin.bottom + 70)
    .style("text-anchor", "middle")
    .attr("font-family", "Saira bold")
    .attr("font-weight", function (d, i) { return i * 100 + 100; })
    .text("Gini Index in United States 1974-2019");

  const yAxis = d3.axisLeft(yScale)

  const yAxisGroup = svg.append("g")
    .attr("class", "yAxis")
    .attr("transform", `translate(${margin.left}, ${0})`)
    .call(yAxis)

  // // GOUPING BY DATA

  // // LINE GENERATOR FUNCTION
  const areaGen = d3.area()
    .x(d => {

      return xScale(new Date(d.Year)) + 2
    })
    .y0(height - margin.bottom)
    .y1(d => {
      return yScale(d.gini)

    })


  svg.selectAll(".path")
    .data(data) // 
    .join("path")
    .attr("class", 'line')
    .attr("fill", "green")
    .attr("stroke", "black")
    .attr("stroke-width", 2.5)
    .attr("d", areaGen(data))


});


