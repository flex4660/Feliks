//Create drawbarchart function to draw the bar chart
function drawBarChart(wombatSightings){
     //Set up variables for width and height of SVG made the code more flexible
    var w = 500;
    var h = 100;
    //Add new variable which is padding
    var padding =1;
    //Select the bar chart and append an SVG element
    var svg = d3.select("#chart")
            .append("svg")
            .attr("width", w)
            .attr("height", h);
    //Using rectangle to draw bar chart
    //Selectall rectangles in the DOM
    svg.selectAll("rect")
    //To execute 12 times (depends on how many values in data) in rectangle
    .data(wombatSightings)
    .enter()
    //Appends the new rectangle element into the DOM
    .append("rect")
    .attr("x", function(d,i){
        //Set the x position of each bars based on wombatsightings and padding
        return i* (w / wombatSightings.length) + padding * i;
    })
    .attr("y", function(d){
        //Set Y Position and height based on data value
        return h - (d.wombats * 4);
    })
    //Adjusting the width to accommodate padding
    .attr("width", w / wombatSightings.length - padding)
    //Using the dataset itself as the height attribute
    .attr("height", function(d){
        //Scale up the dataset to 4, so that it can be more visible
        return d.wombats * 4;
    })//Color of the bars
    .attr( "fill","navy");
}
//Assign the function above when the window loads
window.onload = function(){
    //Read CSV file
    d3.csv("Task_2.4_data.csv").then(function(wombatSightings){
        console.log(wombatSightings);
    //Call the drawbarchart function
        drawBarChart(wombatSightings);
        //Set method to handle errors
    }).catch(function(error){
        console.log("Cannot read CSV File:", error);
    });
};
