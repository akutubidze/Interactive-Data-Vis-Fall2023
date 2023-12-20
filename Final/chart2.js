// const width = window.innerWidth * .7;


d3.csv('Sorted.csv', d3.autoType)
    .then(data => {
        const height = 1000;
        const margin = { top: 20, bottom: 60, left: 120, right: 40 }

        const arr = [


        ]


        console.log(data)

        const allClass = data.map(d => d.Classification)
        const uniqueClass = Array.from(new Set(allClass))


        const classData = []

        uniqueClass.forEach(classification => {
            let count = 0

            data.forEach(row => {
                if (row.Classification == classification) {
                    count++
                }

            })

            classData.push({
                classification: classification,
                count: count
            })

        })
        classData.sort((a, b) => a.count - b.count).reverse()

        console.log(classData)

        /* SCALES */
        /** This is where you should define your scales from data to pixel space */
        const yScale = d3.scaleBand()
            .domain(classData.map(d => d.classification)) // აქ რა იქნება? სიესვი როგორ ავიღო?
            .range([height, 0])


        const xScale = d3.scaleLinear()
            .domain([-200, d3.max(classData.map(d => d.count))])
            .range([0, width])

        /* HTML ELEMENTS */
        // SVG
        const svg = d3.select('#chart-2-container')
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
            .data(classData)
            .join("rect")
            .attr("class", "bar")
            .attr("x", d => xScale(0))
            .attr("y", d => yScale(d.classification))
            .attr("height", yScale.bandwidth())
            .attr("width", d => xScale(d.count))
            .attr("height", 50)
            .style("fill", "limegreen");



        const xAxisGroup = svg.append("g")
        const yAxisGroup = svg.append("g")

        yAxisGroup
            .call(d3.axisLeft(yScale))

        xAxisGroup
            .style("transform", `translate(0, ${height}px)`)
            .call(d3.axisBottom(xScale))



    })
