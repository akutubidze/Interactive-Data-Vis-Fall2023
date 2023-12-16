// /* CONSTANTS AND GLOBALS */
// const width = window.innerWidth * 0.7,
//   height = window.innerHeight * 0.8,
//   margin = { top: 20, bottom: 60, left: 60, right: 40 },
//   radius = 5;
// let xScale;
// let yScale;
// let svg;
// let colorscale

// /* APPLICATION STATE */
// let state = {
//   data: [],
// };

// /* LOAD DATA */
// d3.csv('../data/MoMA_topTenNationalities.csv', d3.autoType).then(raw_data => {
//   console.log("data", raw_data);
//   // save our data to application state
//   state.data = raw_data;
//   init();
// });

// /* INITIALIZING FUNCTION */
// // this will be run *one time* when the data finishes loading in
// function init() {
//   console.log(state)

//   svg = d3.select("#container")
//     .append('svg')
//     .attr("width", width)
//     .attr("height", height)
//     // .attr("transform", `translate(${margin.left},${margin.top})`)
//     .style("background-color", "pink")

//   /* SCALES */

//   xScale =
//     d3.scaleBand().
//       domain(state.data.map(d => d.Count))
//       .range([0, width]) // visual variable
//   // .paddingInner(.2);

//   yScale = d3.scaleLinear()
//     .domain(d3.extent(state.data, d => d.Nationality))
//     // .domain([0, d3.max(state.data, d => d.Count)])
//     .range([height, 0]);

//   //Axis
//   const xAxis = d3.axisBottom(xScale)
//   const yAxis = d3.axisLeft(yScale)



//   //UI Element setup
//   //SVG
//   // svg = d3.select("#container")
//   //   .append("svg")
//   //   .attr("width", width)
//   //   .attr("height", height)

//   svg
//     .append("g")
//     .attr("transform", `translate(0,${height - 20})`)
//     .call(xAxis);



//   svg.append("g")
//     .attr("transform", `translate(${20},0)`)
//     .call(yAxis);


//   draw(); // calls the draw function
// }

// /* DRAW FUNCTION */
// // we call this every time there is an update to the data/state
// function draw() {
//   /* HTML ELEMENTS */

//   //Filter data based on state


//   console.log(xScale)

//   svg.selectAll('rect.countries')
//     .data(state.data)
//     .join("rect")
//     .attr("class", "countries")
//     .attr("x", d => xScale(d.Count))
//     .attr("y", d => yScale(d.Nationality))
//     // .attr("height", yScale.bandWidth())
//     .attr("width", 50)
//     .attr("height", d => xScale(d.Count))
//     .style("fill", "red");
//   // .attr("height", d => height - yScale(d.count))
//   // .attr("x", d => xScale(d.activity))
//   // .attr("y", d => yScale(d.count))

// }



// set the dimensions and margins of the graph
var margin = { top: 30, right: 30, bottom: 70, left: 60 },
  width = 1200 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#container")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
// /* APPLICATION STATE */
let state = {
  data: [],
  color: "limegreen"
};


d3.csv('../data/MoMA_topTenNationalities.csv', d3.autoType).then(row_data => {
  console.log(row_data)
  state.data = row_data

  // X axis
  var x = d3.scaleBand()

    .domain(state.data.map(d = d.Nationality)//function (d) { return d.Nationality; }))
      .range([0, width])
      .padding(0.2);

  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(50%, 0) rotate(0)")
  // .style("text-anchor", "end");

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 5500])
    .range([height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Bars
  svg.selectAll("mybar")
    .data(state.data)
    .enter()
    .append("rect")
    .attr("x", function (d) { return x(d.Nationality); })
    .attr("y", function (d) { return y(d.Count); })
    .attr("width", x.bandwidth())
    .attr("height", function (d) { return height - y(d.Count); })
    .attr("fill", state.color)

})