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

  console.log('geojson, nationalities', geojson, nationalities)

  const countriesFromCSV = new Set(nationalities.map(d => d.States));

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
  const pathGen = d3.geoPath().projection(projection)


  // APPEND GEOJSON PATH  
  const countries = svg
    .selectAll("path.state")
    .data(geojson.features)
    .attr("class", 'state')
    .join("path")
    .attr("d", pathGen)
    .attr("stroke", 'black')
    // .attr("fill", "transparent")
    .attr("fill", d => countriesFromCSV.has(d.properties.name) ? "lightgreen" : "lightyellow");
  //ეს ფროფერთის სახელი აღებულია ჯიოჯეისონიდან



  //append  circles დრო თუ მექნა აქ დავამატო წრეები
  //     svg.append("circle")
  //     .attr()
  //       .attr("transform", ( )=> {const [x,y] = projection([]) 
  //       return `translate(${x}, ${y})`

  //     })

  // svg.selectAll("circle.nationality")
  // .data(nationalities)
  // .join("circle")
  // .attr("class", "nationality")
  // .attr("r", 5)
  // d=>{const [x,y] = projection([d.]) 
  //   return `translate(${x}, ${y})`


  console.log(countries)
  // APPEND DATA AS SHAPE

});