// Define the dimensions of the SVG
var w = 500;
var h = 300;

// Define the dataset
var dataset = [
    [5,20],
    [480,90],
    [250,50],
    [100,33],
    [330,95],
    [410,12],
    [475,44],
    [25,67],
    [85,21],
    [220,88]
];
var padding = 30;

// Define xScale
var xScale = d3.scaleLinear()
    .domain([0, d3.max(dataset, function(d) {
        return d[0];
    })])
    // Apply the padding in the Range
    .range([padding, w - padding * 2]);

// Define yScale
var yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset, function(d) {
        return d[1];
     })])
     // Reverse the range to have lower values at the bottom
    .range([h - padding, padding]);

// Define rScale
var rScale = d3.scaleLinear()
    .domain([0, d3.max(dataset, function(d) {
        return d[1];
     })])
    .range([2,5]);

// Create SVG element
var svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

// Append the x-axis into a new group element
var xAxis = d3.axisBottom(xScale);
svg.append("g")
    .attr("class", "axis")
    //Used translate to move the xAxis down to the bottom of the SVG
    //(0. from the left and h-padding pixels from top)
    .attr("transform", "translate(0," + (h - padding) + ")")
    .call(xAxis);

// Append the y-axis
var yAxis = d3.axisLeft(yScale);
svg.append("g")
    .attr("class", "axis")
     //Used translate to move the xAxis down to the bottom of the SVG
    //(Moved the entire yaxis group to the right by padding pixels)
    .attr("transform", "translate(" + padding + ",0)")
    .call(yAxis);

// Create circle for each data point in the array
svg.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("cx", function(d) {
        return xScale(d[0]);
     })
    .attr("cy", function(d) {
         return yScale(d[1]);
         })
    .attr("r", function(d) {
        return rScale(d[1]);
     })
    .attr("fill", "grey");

// Append the text elements above the circles
//Used .circle-text to make the text appear above the circle
svg.selectAll(".circle-text")
    .data(dataset)
    .enter()
    .append("text")
    .attr("class", "circle-text")
    .text(function(d){
        return d[0] + "," + d[1];
    })
    .attr("x", function(d){
        return xScale(d[0]);
    })
    .attr("y", function(d){
        // Adjusted to be above the circles
        return yScale(d[1]) - rScale(d[1]) - 5;
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "10px")
    .attr("fill", "green")
    //Make the text right to make it visible for all the text appear
    .attr("text-anchor", "right");
