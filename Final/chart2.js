// const width = window.innerWidth * .7;

const x = d3
  .scaleLog()
  .domain([1, 1000]) // This is what is written on the Axis: from 0 to 100
  .range([100, 800]) // This is where the axis is placed: from 100 px to 800px
  .base(10);

d3.csv("Sorted.csv", d3.autoType).then((data) => {
  const height = 600;
  //   const width = window.innerWidth * 0.7;
  const width = 800;

  const margin = { top: 20, bottom: 60, left: 120, right: 40 };
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
  /** This is where you should define your scales from data to pixel space */
  const yScale = d3
    .scaleBand()
    .domain(classData.map((d) => d.classification)) // აქ რა იქნება? სიესვი როგორ ავიღო?
    .range([height, 0]);

  const xScale = d3
    .scaleLog()
    .domain([0.5, d3.max(classData.map((d) => d.count)) + 1])
    // .domain([1,5, 10, 100, 1000, 10000, d3.max(classData.map((d) => d.count))])
    .range([0, width]);

  /* HTML ELEMENTS */
  // SVG
  const svg = d3
    .select("#chart-2-container")
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
    .data(classData)
    .join("rect")
    .attr("class", "bar")
    .attr("data-value", (d) => d.count)
    .attr("x", (d) => {
      return xScale(0);
    })
    .attr("y", (d) => yScale(d.classification))
    .attr("height", 50)
    .attr("width", 0)
    .style("fill", "tomato")
    .transition()
    .duration(1500) //time in ms
    .attr("width", function (d) {
      return xScale(d.count);
    })
    .attr("height", 30)
    .style("fill", "orange");

  const yAxisGroup = svg.append("g");

  yAxisGroup.call(d3.axisLeft(yScale));

  const xAxisGroup = d3
    .axisBottom(xScale)
    .tickValues([0, 1, 2, 4, 10, 30, 100, 300, 1000, 5000, 30000])
    .tickFormat((d, i) => {
      console.log(d, i);
      return d;
    });

  svg
    .append("g")
    .style("transform", `translate(0, ${height}px)`)
    .call(xAxisGroup);

  // Bar Tooltips
  tippy("rect.bar", {
    content: (reference) => reference.getAttribute("data-value"),
    color: "rgb(255, 165, 0)",
  });
});
