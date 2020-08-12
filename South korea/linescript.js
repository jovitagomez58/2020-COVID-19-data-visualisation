var svg = d3.select("#line").append("svg").attr("width", "1500").attr("height", 500)
var tooltip = d3.select("body").append("div").attr("class", "flowpop").style("position", "absolute").style("text-align", "center").style("visibility", "hidden")
// all provinces
var province = ["Seoul", "Busan", "Daegu", "Gwangju", "Incheon", "Daejeon", "Ulsan", "Gyeonggi-do", "Gangwon-do", "Chungcheongbuk-do", "Chungcheongnam-do", "Jeollabuk-do", "Jeollanam-do", "Gyeongsangbuk-do", "Gyeongsangnam-do", "Jeju-do"]
var margin = { top: 20, bottom: 20, left: 20, right: 200 }
var linesvg = tooltip.append("svg").attr("width", 300).attr("height", 300)
var width = 1500 - margin.left - margin.right
var height = 500 - margin.top - margin.bottom
var x = d3.scaleTime().range([0, width])
var y = d3.scaleLinear().range([height, 0])
var g = svg.append("g").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

drawLine(new Set())

document.getElementsByName('check').forEach(function(checkbox) {
    checkbox.onchange = function() {
        var provinces = new Set()
        document.getElementsByName('check').forEach(function(input) {
            if (input.checked) {
                // get selected provinces
                provinces.add(input.value)
            }
        })
        drawLine(provinces)
    }
})

function drawLine(provinces) {
    d3.csv("Weather.csv", function(error, data) {
        g.selectAll("path").remove()
        g.selectAll("circle").remove()
        g.selectAll("g").remove()
        console.log(provinces)
        // format time
        var parser = d3.timeParse("%Y-%m-%d")
        data.forEach(function(d) {
            d.date = parser(d.date)
        })

        
        
        // all colors for provinces
        var colors = [intToRGB(hashCode("Seoul")),
                    intToRGB(hashCode("Busan")),
                    intToRGB(hashCode("Daegu")),
                    intToRGB(hashCode("Gwangju")),
                    intToRGB(hashCode("Incheon")),
                    intToRGB(hashCode("Daejeon")),
                    intToRGB(hashCode("Ulsan")),
                    intToRGB(hashCode("Gyeonggi-do")),
                    intToRGB(hashCode("Gangwon-do")),
                    intToRGB(hashCode("Chungcheongbuk-do")),
                    intToRGB(hashCode("Chungcheongnam-do")),
                    intToRGB(hashCode("Jeollabuk-do")),
                    intToRGB(hashCode("Jeollanam-do")),
                    intToRGB(hashCode("Gyeongsangbuk-do")),
                    intToRGB(hashCode("Gyeongsangnam-do")),
                    intToRGB(hashCode("Jeju-do"))]

        // draw legend
        var legend = svg.selectAll(".legend")
                    .data(colors)
                    .enter().append("g")
                    .attr("class", "legend")
                    .attr("transform", function(d, i) {
                        return "translate(300," + (i * 20 + 220) +  ")";
                    });

            legend.append("circle")
                    .attr("cx", width - 300)
                    .attr("cy", height - 500)
                    .attr("r", 9)
                    .style("fill", function(d, i) {
                        return colors.slice()[i];
                    });

            legend.append("text")
                    .attr("x", width - 290)
                    .attr("y", height - 500)
                    .attr("dy", ".35em")
                    .style("text-anchor", "start")
                    .text(function(d, i) {
                        return province[i]
                    });

        // start date
        var dateStart = parser("2020-01-01")

        data = data.filter(function(d) {
            return d.date.getTime() >= dateStart.getTime()
        })

        x.domain(d3.extent(data, function(f) {
            return f.date
        }))

        y.domain([-20,35])

        // get data for selected provinces
        data = data.filter(function(row) {
            var province = row.province.valueOf()
            if (provinces.has(province)) {
                return true
            } else {
                return false
            }
        })

        var lineGenerator = d3.line().x(function(f) {
            return x(f.date)
        }).y(function(f) {
            return y(f.avg_temp)
        })

        // for each province in selected draw line
        provinces.forEach(function(d) {
            var filter = data.filter(function(row) {
                return row.province == d
            })
            
            g.append("path").data([filter]).attr("class", "line").attr("d", lineGenerator).style("stroke", function(d) {
                return "#" + intToRGB(hashCode(d[0].province))
            })
        })

        g.append("g").attr("transform", "translate(0, " + height + ")").call(d3.axisBottom(x))
        g.append("g").call(d3.axisLeft(y))
        g.selectAll("circle").data(data).enter()
        .append("circle")
        .attr("cx", function(d) {
            return x(d.date)
        }).attr("cy", function(d) {
            return y(d.avg_temp)
        }).attr("r", 3)
        .style("fill", "black").style("opacity", 0)
        .on("mouseover", function(d) {
            tooltipDetail(d.province, d.date)
        })
        .on("mousemove", function() {
            return tooltip.style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px")
        })
        .on("mouseout", function() {
            tooltip.style("visibility", "hidden")
        })

    })

}


function hashCode(str) { // java String#hashCode
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
       hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
} 

function intToRGB(i){
    var c = (i & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();

    return "00000".substring(0, 6 - c.length) + c;
}

function tooltipDetail(province, date) {
    var width = 300
    var height = 300
    var formatTime = d3.timeFormat("%Y-%m-%d");
    date = formatTime(date)

    d3.csv("PatientInfo.csv", function(error, data) {
        linesvg.selectAll("g").remove()
        data = data.filter(function(d) {
            return (d.province.valueOf() == province.valueOf() && d.confirmed_date.valueOf() == date.valueOf())
        })
        var pieData = []
        pieData.push(data.filter(function(d) {
            return d.state.valueOf() == "isolated"
        }).length)
        pieData.push(data.filter(function(d) {
            return d.state.valueOf() == "released"
        }).length)
        pieData.push(data.filter(function(d) {
            return d.state.valueOf() == "deceased"
        }).length)
        console.log(pieData)
        var colors = ['#4daf4a','#377eb8','#ff7f00']
        var color = d3.scaleOrdinal(['#4daf4a','#377eb8','#ff7f00']);
        var pie = d3.pie()
        console.log(pie(pieData))
    

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
                return "translate(-130," + ((i * 20) - 130) +  ")";
            });    
            legend.append("circle")
                    .attr("cx", 0)
                    .attr("cy", 0)
                    .attr("r", 9)
                    .style("fill", function(d, i) {
                        return colors.slice()[i];
                    });
            legend.append("text")
                    .attr("x", 10)
                    .attr("y", 0)
                    .attr("dy", ".35em")
                    .style("text-anchor", "start")
                    .text(function(d, i) {
                        switch (i) {
                            case 0:
                                return "isolated: " + pieData[0]
                            case 1:
                                return "released: " + pieData[1]
                            case 2:
                                return "deceased: " + pieData[2]
                        }
                    });
        
    })

    tooltip.style("visibility", "visible")

}