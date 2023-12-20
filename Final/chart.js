/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.8;
const height = 600;

/* LOAD DATA */
d3.csv("Artworks.csv", d3.autoType).then((data) => {
  const allDepartments = data.map((d) => d.Department);
  const uniqueDepartment = Array.from(new Set(allDepartments));

  const departmentsData = [];

  uniqueDepartment.forEach((department) => {
    let count = 0;

    data.forEach((row) => {
      if (row.Department == department) {
        count++;
      }
    });

    departmentsData.push({
      department: department,
      count: count,
    });
  });

  console.log(departmentsData);

  departmentsData.sort((a, b) => a.count - b.count);

  // medium, count
  // "Crayon on mulberry paper", 40
  // "Crayon on mulberry paper", 40

  // console.log(allMediums)
  // console.log(uniqueMediums)

  /* SCALES */
  /** This is where you should define your scales from data to pixel space */
  const yScale = d3
    .scaleBand()
    .domain(departmentsData.map((d) => d.department)) // აქ რა იქნება? სიესვი როგორ ავიღო?
    .range([height, 0]);

  const xScale = d3
    .scaleLinear()
    .domain([-800, d3.max(departmentsData.map((d) => d.count))])
    .range([0, width]);

  /* HTML ELEMENTS */
  // SVG
  const svg = d3
    .select("#chart-1-container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background-color", "aliceblue")
    .style("overflow", "visible");
  //axis scales

  // svg.append("g")
  // .attr("transform", translate(${0},${height - margin.bottom})')
  // .call(selection => selection.call(xAis))
  // .attr("transform", 'translate(${margin.left},${0}))
  /** Select your container and append the visual elements to it */

  // BARS
  const color = d3.scaleOrdinal(d3.schemeAccent);
  const bars = svg
    .selectAll("rect.bar")
    .data(departmentsData)
    .join("rect")
    .attr("class", "bar")
    .attr("x", (d) => xScale(0))
    .attr("y", (d) => yScale(d.department))
    .attr("height", 50)
    .attr("width", 0)
    .style("fill", "tomato")
    .transition()
    .duration(1500) //time in ms
    .attr("width", function (d) {
      return xScale(d.count);
    })
    .attr("height", 50)
    .style("fill", "orange");

  const xAxisGroup = svg.append("g");
  const yAxisGroup = svg.append("g");

  yAxisGroup.call(d3.axisLeft(yScale));

  xAxisGroup
    .style("transform", `translate(0, ${height}px)`)
    .call(d3.axisBottom(xScale));
});
