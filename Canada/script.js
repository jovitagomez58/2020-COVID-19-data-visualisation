var svg = d3.select("svg")
var tooltip = d3.select("body").append("div").attr("class", "flowpop").style("position", "absolute").style("text-align", "center").style("visibility", "hidden")
linesvg = tooltip.append("svg").attr("width", 300).attr("height", 300)
var margin = { top: 20, bottom: 20, left: 20, right: 20 }
var width = 1000 - margin.left - margin.right
var height = 600 - margin.top - margin.bottom
var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");


var lCol = "Canada";    
var rCol = "Korea";

var x = d3.scaleLinear().range([0, width/2 - 50])
var y = d3.scaleBand().range([20, height]).padding(0.1);

g.append("text").attr("x",width/3).attr("y", 10).attr("class","title").text("Canada");
g.append("text").attr("x",width/2 - 35).attr("y", 10).attr("class","title").text("Age");
g.append("text").attr("x",(width * 2)/3 - 80).attr("y", 10).attr("class","title").text("Korea");

d3.csv("public-covid-19-cases-canada-2.csv", function(error, data) {
    data = sortCanadaData(data)
    console.log("Canada", data)
    x.domain([250, 0]);
    y.domain(data.map(function(d) { return d.age }))
    g.selectAll(".bar").data(data)
            .enter().append("rect")
            .attr("width", function(d) { 
                return x(250 - (d.travel)); 
            })
            .attr("y", function(d) { return y(d.age) })
            .attr("x", function(d) { return x((d.travel))})
            .attr("height", y.bandwidth())
            .attr("fill", "orange")
            .on("mouseover", function(d) {
                drawtooltip(d);
            })
            .on("mousemove", function(thisElement) {
                return tooltip.style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px")
            })
            .on("mouseout", function(thisElement) {
                tooltip.style("visibility", "hidden")
            })

    g.selectAll(".bar").data(data)
            .enter().append("rect")
            .attr("width", function(d) {
                return x(250 - (d.non_travel));
            })
            .attr("y", function(d) { return y(d.age) })
            .attr("x", function(d) { return x((d.non_travel + d.travel))})
            .attr("height", y.bandwidth())
            .attr("fill", "green")
            .on("mouseover", function(d) {
                drawtooltip(d);
            })
            .on("mousemove", function(thisElement) {
                return tooltip.style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px")
            })
            .on("mouseout", function(thisElement) {
                tooltip.style("visibility", "hidden")
            })

    g.append("g").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x));
    
    g.selectAll("text.name").data(data).enter().append("text")
            .attr("x", width / 2 - 25)
            .attr("y", function(d) {
                return y(d.age) + y.bandwidth() / 2
            })
            .attr("text-anchor", "middle")
            .text(function(d) { return d.age })

    g.selectAll("text.name").data(data).enter().append("text")
            .attr("x", function(d) {
                return x(d.travel + d.non_travel) - 20
            })
            .attr("y", function(d) {
                return y(d.age) + y.bandwidth() / 2
            })
            .attr("text-anchor", "middle")
            .text(function(d) { return (d.travel + d.non_travel) })
})

d3.csv("PatientInfo.csv", function(error, data) {
    data = sortKoreaData(data)
    console.log("Korea", data)
    x.domain([0, 900]);
    y.domain(data.map(function(d) { return d.age }))
    g.selectAll(".bar").data(data)
            .enter().append("rect")
            .attr("width", function(d) { 
                return x(d.travel); 
            })
            .attr("y", function(d) { return y(d.age) })
            .attr("x", function(d) { return x(1000)})
            .attr("height", y.bandwidth())
            .attr("fill", "orange")
            .on("mouseover", function(d) {
                drawtooltip(d);
            })
            .on("mousemove", function(thisElement) {
                return tooltip.style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px")
            })
            .on("mouseout", function(thisElement) {
                tooltip.style("visibility", "hidden")
            })

    g.selectAll(".bar").data(data)
            .enter().append("rect")
            .attr("width", function(d) {
                return x(d.non_travel);
            })
            .attr("y", function(d) { return y(d.age) })
            .attr("x", function(d) { return x(1000 + d.travel)})
            .attr("height", y.bandwidth())
            .attr("fill", "green")
            .on("mouseover", function(d) {
                drawtooltip(d);
            })
            .on("mousemove", function(thisElement) {
                return tooltip.style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px")
            })
            .on("mouseout", function(thisElement) {
                tooltip.style("visibility", "hidden")
            })

    g.selectAll("text.name").data(data).enter().append("text")
            .attr("x", function(d) {
                return (width / 2) + x(d.travel + d.non_travel) + 20
            })
            .attr("y", function(d) {
                return y(d.age) + y.bandwidth() / 2
            })
            .attr("text-anchor", "middle")
            .text(function(d) { return (d.travel + d.non_travel) })

    g.append("g").attr("transform", "translate(475," + height + ")").call(d3.axisBottom(x));

    var colors = ["orange", "green"]
    var legend = svg.selectAll(".legend")
                .data(colors)
                .enter().append("g")
                .attr("class", "legend")
                .attr("transform", function(d, i) {
                    return "translate(200," + (i * 20 + 220) +  ")";
                });

        legend.append("circle")
                .attr("cx", width - 300)
                .attr("cy", height - 500)
                .attr("r", 9)
                .style("fill", function(d, i) {
                    return colors.slice().reverse()[i];
                });

        legend.append("text")
                .attr("x", width - 290)
                .attr("y", height - 500)
                .attr("dy", ".35em")
                .style("text-anchor", "start")
                .text(function(d, i) {
                    switch (i) {
                        case 0:
                            return "non-travel"
                            break
                        case 1:
                            return "travel"
                            break
                    }
                });
})

function sortCanadaData(data) {
    var sorted = [{"age" : "0-10", "Male": 0, "Female": 0, "travel": 0, "non_travel": 0},
                    {"age" : "10-19", "Male": 0, "Female": 0, "travel": 0, "non_travel": 0},
                    {"age" : "20-29", "Male": 0, "Female": 0, "travel": 0, "non_travel": 0},
                    {"age" : "30-39", "Male": 0, "Female": 0, "travel": 0, "non_travel": 0},
                    {"age" : "40-49", "Male": 0, "Female": 0, "travel": 0, "non_travel": 0},
                    {"age" : "50-59", "Male": 0, "Female": 0, "travel": 0, "non_travel": 0},
                    {"age" : "60-69", "Male": 0, "Female": 0, "travel": 0, "non_travel": 0},
                    {"age" : "70-79", "Male": 0, "Female": 0, "travel": 0, "non_travel": 0},
                    {"age" : "80-89", "Male": 0, "Female": 0, "travel": 0, "non_travel": 0},
                    {"age" : "90-99", "Male": 0, "Female": 0, "travel": 0, "non_travel": 0}]

    sorted.forEach(function(s) {
        s.Male = data.filter(function(d) {
            return (d.age.valueOf() == s.age.valueOf() && d.sex == "Male")
        }).length
        s.Female = data.filter(function(d) {
            return (d.age.valueOf() == s.age.valueOf() && d.sex == "Female")
        }).length
        s.travel = data.filter(function(d) {
            return (d.has_travel_history == "t" && d.age.valueOf() == s.age.valueOf())
        }).length
        s.non_travel = data.filter(function(d) {
            return (d.has_travel_history == "f" && d.age.valueOf() == s.age.valueOf())
        }).length
    })
    return sorted
}

function sortKoreaData(data) {
    var sorted = [{"age" : "0-10", "Male": 0, "Female": 0, "travel": 0, "non_travel": 0},
                    {"age" : "10-19", "Male": 0, "Female": 0, "travel": 0, "non_travel": 0},
                    {"age" : "20-29", "Male": 0, "Female": 0, "travel": 0, "non_travel": 0},
                    {"age" : "30-39", "Male": 0, "Female": 0, "travel": 0, "non_travel": 0},
                    {"age" : "40-49", "Male": 0, "Female": 0, "travel": 0, "non_travel": 0},
                    {"age" : "50-59", "Male": 0, "Female": 0, "travel": 0, "non_travel": 0},
                    {"age" : "60-69", "Male": 0, "Female": 0, "travel": 0, "non_travel": 0},
                    {"age" : "70-79", "Male": 0, "Female": 0, "travel": 0, "non_travel": 0},
                    {"age" : "80-89", "Male": 0, "Female": 0, "travel": 0, "non_travel": 0},
                    {"age" : "90-99", "Male": 0, "Female": 0, "travel": 0, "non_travel": 0}]
    data.forEach(function(row) {
        if (row.sex == "male") {
            switch (row.age){
                case "0s":
                    sorted[0].Male += 1;
                    break
                case "10s":
                    sorted[1].Male += 1;
                    break
                case "20s":
                    sorted[2].Male += 1;
                    break
                case "30s":
                    sorted[3].Male += 1;
                    break
                case "40s":
                    sorted[4].Male += 1;
                    break
                case "50s":
                    sorted[5].Male += 1;
                    break
                case "60s":
                    sorted[6].Male += 1;
                    break
                case "70s":
                    sorted[7].Male += 1;
                    break
                case "80s":
                    sorted[8].Male += 1;
                    break
                case "90s":
                    sorted[9].Male += 1;
                    break
            }
        }else if (row.sex == "female") {
            switch (row.age){
                case "0s":
                    sorted[0].Female += 1;
                    break
                case "10s":
                    sorted[1].Female += 1;
                    break
                case "20s":
                    sorted[2].Female += 1;
                    break
                case "30s":
                    sorted[3].Female += 1;
                    break
                case "40s":
                    sorted[4].Female += 1;
                    break
                case "50s":
                    sorted[5].Female += 1;
                    break
                case "60s":
                    sorted[6].Female += 1;
                    break
                case "70s":
                    sorted[7].Female += 1;
                    break
                case "80s":
                    sorted[8].Female += 1;
                    break
                case "90s":
                    sorted[9].Female += 1;
                    break
            }
        }

        if (row.infection_case == "overseas inflow") {
            switch (row.age){
                case "0s":
                    sorted[0].travel += 1;
                    break
                case "10s":
                    sorted[1].travel += 1;
                    break
                case "20s":
                    sorted[2].travel += 1;
                    break
                case "30s":
                    sorted[3].travel += 1;
                    break
                case "40s":
                    sorted[4].travel += 1;
                    break
                case "50s":
                    sorted[5].travel += 1;
                    break
                case "60s":
                    sorted[6].travel += 1;
                    break
                case "70s":
                    sorted[7].travel += 1;
                    break
                case "80s":
                    sorted[8].travel += 1;
                    break
                case "90s":
                    sorted[9].travel += 1;
                    break
            }
        } else {
            switch (row.age){
                case "0s":
                    sorted[0].non_travel += 1;
                    break
                case "10s":
                    sorted[1].non_travel += 1;
                    break
                case "20s":
                    sorted[2].non_travel += 1;
                    break
                case "30s":
                    sorted[3].non_travel += 1;
                    break
                case "40s":
                    sorted[4].non_travel += 1;
                    break
                case "50s":
                    sorted[5].non_travel += 1;
                    break
                case "60s":
                    sorted[6].non_travel += 1;
                    break
                case "70s":
                    sorted[7].non_travel += 1;
                    break
                case "80s":
                    sorted[8].non_travel += 1;
                    break
                case "90s":
                    sorted[9].non_travel += 1;
                    break
            }
        }
    })
    return sorted
}



function drawtooltip(data) {
    console.log(data)
    linesvg.selectAll("g").remove();
    var pieData = [data.Male, data.Female]
    var width = 300
    var height = 300
    var colors = ['#4daf4a','#377eb8']
    var color = d3.scaleOrdinal(['#4daf4a','#377eb8']);
    var pie = d3.pie()
    var radius = Math.min(width, height) / 2 - 50

    var gtool = linesvg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    console.log("radius", radius)
    // Generate the arcs
    var arc = d3.arc()
                .innerRadius(0)
                .outerRadius(radius);
    // Generate groups
    var arcs = gtool.selectAll("arc")
                .data(pie(pieData))
                .enter()
                .append("g")
                .attr("class", "arc")

    // draw arc path
    arcs.append("path")
        .attr("fill", function(d, i) {
            return color(i)
        })
        .attr("d", arc);

    var legend = gtool.selectAll(".legend")
                .data(colors)  
                .enter().append("g")
                .attr("class", "legend")
                .attr("transform", function(d, i) {
                    return "translate(-130," + ((i * 20) - 100) +  ")";
                });    
        legend.append("circle")
                .attr("cx", 0)
                .attr("cy", 0)
                .attr("r", 9)
                .style("fill", function(d, i) {
                    return colors.slice().reverse()[i];
                });
        legend.append("text")
                .attr("x", 10)
                .attr("y", 0)
                .attr("dy", ".35em")
                .style("text-anchor", "start")
                .text(function(d, i) {
                    switch (i) {
                        case 0:
                            return "Female: " + pieData[1]
                            break
                        case 1:
                            return "Male: " + pieData[0]
                            break
                    }
                });


        tooltip.style("visibility", "visible")
}