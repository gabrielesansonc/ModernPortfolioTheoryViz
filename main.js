const margin = { top: 10, right: 30, bottom: 30, left: 40 },
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

let svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .style("border", "2px solid black")
    .call(d3.zoom().on("zoom", zoomed))
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

let tooltip = d3.select("#tooltip");

let xScale = d3.scaleLinear().domain([-30, 30]).range([0, width]);
let yScale = d3.scaleLinear().domain([-30, 30]).range([height, 0]);
let color = d3.scaleOrdinal(d3.schemeCategory10);
let size = d3.scaleLinear().domain([0, 1e12]).range([1, 9]);

Promise.all([
    d3.csv("sp_500_clustering.csv"),
    d3.csv("sp_500_stocks.csv")
]).then(function(files) {
    let data = files[0];
    let stockData = files[1];

    data.forEach(d => {
        d['Isomap-1'] = +d['Isomap-1'];
        d['Isomap-2'] = +d['Isomap-2'];
        d['Marketcap'] = +d['Marketcap'];
        d['Cluster'] = +d['Cluster'];
        d.selectionCount = 0;
    });

    stockData.forEach(d => {
        d['Year 1 Returns'] = +d['Year 1 Returns'];
        d['Year 2 Returns'] = +d['Year 2 Returns'];
        d['Year 3 Returns'] = +d['Year 3 Returns'];
        d['Year 4 Returns'] = +d['Year 4 Returns'];
        d['Year 5 Returns'] = +d['Year 5 Returns'];
        // Additional processing for stockData can be included here
    });

    createScatterPlot(data);
});

function createScatterPlot(data) {
    let scatter = svg.append('g').attr("clip-path", "url(#clip)");

    scatter.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("r", d => size(d.Marketcap))
        .attr("cx", d => xScale(d['Isomap-1']))
        .attr("cy", d => yScale(d['Isomap-2']))
        .style("fill", d => color(d.Cluster))
        .on("mouseover", showTooltip)
        .on("mouseout", hideTooltip)
        .on("click", updateSelection);
}

function showTooltip(event, d) {
    tooltip.transition().duration(200).style("opacity", .9);
    tooltip.html(`${d.Shortname}<br/>${d.Symbol}`)
           .style("left", `${event.pageX}px`)
           .style("top", `${event.pageY - 28}px`);
}

function hideTooltip() {
    tooltip.transition().duration(500).style("opacity", 0);
}

function updateSelection(event, d) {
        // Toggle selection count: increment if not selected, reset to 0 if selected
        d.selectionCount = d.selectionCount > 0 ? 0 : d.selectionCount + 1;

        // Apply the 'selected' class to the circle if it's selected
        d3.select(this)
            .classed("selected", d.selectionCount > 0)
            .style("opacity", d.selectionCount > 0 ? 1 : 0.5);
}

function zoomed({transform}) {
    let new_xScale = transform.rescaleX(xScale);
    let new_yScale = transform.rescaleY(yScale);

    svg.selectAll("circle.dot")
        .attr('cx', d => new_xScale(d['Isomap-1']))
        .attr('cy', d => new_yScale(d['Isomap-2']))
        .attr('r', d => transform.k * size(d.Marketcap));
}