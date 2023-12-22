const height = 600;
const width = 800;
const margin = { top: 20, bottom: 60, left: 120, right: 40 };

d3.csv("Sorted.csv", d3.autoType).then((data) => {
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
    .scaleLog()
    .domain([0.5, d3.max(classData.map((d) => d.count)) + 1])
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
    .text("Quantity of artwork");

  const yAxisGroup = svg.append("g");

  yAxisGroup.call(d3.axisLeft(yScale));

  const xAxisGroup = d3
    .axisBottom(xScale)
    // numbers on the X axes
    .tickValues([0, 1, 2, 4, 10, 30, 100, 300, 1000, 5000, 34126])
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
