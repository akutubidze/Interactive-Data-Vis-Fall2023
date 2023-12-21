// Constants and Globals

const height = 600;
const width = 800;

const margin = { top: 20, bottom: 60, left: 120, right: 40 };

// const x = d3.scaleLog();
// .domain([1, 1000]); // This is what is written on the Axis: from 0 to 100
//   .range([100, 800]); // This is where the axis is placed: from 100 px to 800px
//   .base(10);

d3.csv("Sorted.csv", d3.autoType).then((data) => {
  const arr = [];

  const allClass = data.map((d) => d.Classification);
  const uniqueClass = Array.from(new Set(allClass));

  const classData = [];

  uniqueClass.forEach((classification) => {
    let count = 0;

    data.forEach((row) => {
      if (row.Classification == classification) {
        count++;
      }
    });

    classData.push({
      classification: classification,
      count: count,
    });
  });
  classData.sort((a, b) => a.count - b.count).reverse();

  /* SCALES */

  const yScale = d3
    .scaleBand()
    .domain(classData.map((d) => d.classification))
    .range([height, 0]);

  const xScale = d3
    .scaleLinear()
    .domain([1, d3.max(classData.map((d) => d.count))])
    .range([0, width]);

  // SVG
  const svg = d3
    .select("#chart-2-container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background-color", "aliceblue")
    .style("overflow", "visible");

  // BARS
  const color = d3.scaleOrdinal(d3.schemeAccent);
  const bars = svg
    .selectAll("rect.bar")
    .data(classData)
    .join("rect")
    .attr("class", "bar")

    .attr("x", (d) => {})
    .attr("y", (d) => yScale(d.classification))
    .attr("height", 50)
    .attr("width", 0)
    .style("fill", "tomato")
    .transition()
    .duration(1500)
    .attr("width", function (d) {
      return xScale(d.count);
    })

    .attr("height", 30)
    .style("fill", "orange");

  //Text
  svg
    .append("text")
    .attr("x", width / 2)
    .attr("y", height - margin.bottom + 110)
    .style("text-anchor", "middle")
    .attr("font-family", "Saira bold")
    .attr("font-weight", function (d, i) {
      return i * 100 + 100;
    })
    .text("Amount of artworks");

  const xAxisGroup = svg.append("g");
  const yAxisGroup = svg.append("g");

  yAxisGroup.call(d3.axisLeft(yScale));

  xAxisGroup
    .style("transform", `translate(0, ${height}px)`)
    .call(d3.axisBottom(xScale));
});
