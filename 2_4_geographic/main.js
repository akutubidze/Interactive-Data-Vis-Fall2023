/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.9,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 50, left: 60, right: 40 };

/**
 * LOAD DATA
 * Using a Promise.all([]), we can load more than one dataset at a time
 * */
Promise.all([
  d3.json("../data/world.json"),
  d3.csv("../data/MoMA_nationalities.csv", d3.autoType),
]).then(([geojson, nationalities]) => {

  console.log(nationalities)

  const Countries = new Set(nationalities.map(d => d.Country));


  console.log(Countries)

  const svg = d3.select("#container")
    .append("svg")
    .attr("height", height)
    .attr("width", width)
    .style("background-color", "beige")



  // SPECIFY PROJECTION
  const projection = d3.geoEquirectangular()
    .fitSize([width, height], geojson)

  console.log(projection)

  // DEFINE PATH FUNCTION
  const pathGenFn = d3.geoPath().projection(projection)


  // APPEND GEOJSON PATH  
  const states = svg
    .selectAll("path.state")
    .data(geojson.features)
    .attr("class", 'state')
    .join("path")
    .attr("d", pathGenFn)
    .attr("stroke", 'black')
    .attr("fill", d => Countries.has(d.properties.name) ? "green" : "transparent");

  // svg.append("circle")
  //   .attr("r", 20)
  //   .attr("transform", () => {
  //     const [x, y] = projection([Count])
  //     return `translate(${x}, ${y})`
  //   })

})