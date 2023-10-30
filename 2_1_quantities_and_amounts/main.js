
/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * .7;
const height = 600;

/* LOAD DATA */
d3.csv('../data/MoMA_topTenNationalities.csv', d3.autoType)
  .then(data => {
    console.log("data", data)

    const container = d3.select("#container")
    console.log(container)

    /* SCALES */
    /** This is where you should define your scales from data to pixel space */
    const yScale = d3.scaleBand()
      .domain(data.map(d => d.Nationality)) // აქ რა იქნება? სიესვი როგორ ავიღო?
      .range([height, 0,])


    const xScale = d3.scaleLinear()
      .domain([0, d3.max(data.map(d => d.Count))])
      .range([0, width])

    /* HTML ELEMENTS */
    // SVG
    const svg = d3.select('#container')
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("background-color", "aliceblue")
      .style("overflow", "visible")
    //axis scales

    // svg.append("g")
    // .attr("transform", translate(${0},${height - margin.bottom})')
    // .call(selection => selection.call(xAis))
    // .attr("transform", 'translate(${margin.left},${0}))
    /** Select your container and append the visual elements to it */

    // BARS
    const color = d3.scaleOrdinal(d3.schemeAccent);
    const bars = svg.selectAll("rect.bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .attr("x", d => xScale(0))
      .attr("y", d => yScale(d.Nationality))
      .attr("height", yScale.bandwidth())
      .attr("width", d => xScale(d.Count))
      .attr("height", 50)
      .style("fill", color);


    console.log(bars)


    const xAxisGroup = svg.append("g")
    const yAxisGroup = svg.append("g")

    yAxisGroup
      .call(d3.axisLeft(yScale))

    xAxisGroup
      .style("transform", `translate(0, ${height}px)`)
      .call(d3.axisBottom(xScale))

  })

