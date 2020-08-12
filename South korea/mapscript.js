var mapsvg = d3.select("#map").append("svg").attr("width", 500).attr("height", 500)
var width = 500
var height = 500
var projection = d3.geoMercator().center([127.8,36.5]).scale(5000).translate([width / 2, height / 2])
var tooltipmap = d3.select("body").append("div").attr("id", "mapflow").attr("class", "flowpop").style("position", "absolute").style("text-align", "center").style("visibility", "hidden")
var toolsvg = tooltipmap.append("svg").style("width", "300px").style("height", "300px")
var path = d3.geoPath().projection(projection);
d3.json("skorea-provinces-geo.json", function(error, country) {
    mapsvg.selectAll("path").data(country.features).enter().append("path").attr("class", "land").attr("d", path).attr("fill", "grey");


    d3.csv("Location.csv", function(error, data) {
        d3.csv("Case.csv", function(error, cases) {
            for (var i = 0; i < data.length; i ++) {
                var count = 0;
                for (var j = 0; j < cases.length; j ++) {
                    if (data[i]["province"].valueOf() == cases[j]["province"]) {
                        count += 1
                    }
                }
                data[i]["number"] = count
            }
            var g = mapsvg.append("g")
            g.selectAll(".ports").data(data).enter().append("circle").attr("class", "ports")
                .attr("cx", function(d) {
                    return projection([d.longitude, 0])[0]
                }).attr("cy", function(d) {
                    return projection([0, d.latitude])[1]
                }).attr("r", function(d) {
                    return d.number
                }).style("fill", function(d) {
                    return "#" + intToRGB(hashCode(d.province))
                }).style("stroke-width", 2).style("stroke", "white")
                .on("mouseover", function(d) {
                    drawTooltip(d.province)
                })
                .on("mousemove", function(thisElement) {
                    return tooltipmap.style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px")
                })
                .on("mouseout", function(thisElement) {
                    tooltipmap.style("visibility", "hidden")
                })
        })
    })
})

function drawTooltip(province) {
    var margin = { top: 20, right: 20, left: 30, bottom: 100}
    var width = 300 - margin.right - margin.left;
    var height = 300 - margin.top - margin.bottom;
    
    var x = d3.scaleBand().padding(0.1).range([0,width]);
    var y = d3.scaleLinear().range([height, 0]);
    tooltipmap.style("visibility", "visible")
    d3.csv("PatientInfo.csv", function(error, data) {
        data = data.filter(function(row) {
            return (row.province.valueOf() == province.valueOf() && row.infection_case != "")
        })
        toolsvg.selectAll("g").remove();
        var gTool = toolsvg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        data = countData(data)
        console.log(province, data)
        y.domain([0, d3.max(data, function(d) {
            return d.count
        })])
        x.domain(data.map(function(d) {
            return d.infection_case
        }))

        // x axis
        gTool.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x)).selectAll("text")
            .attr("transform", "rotate(45)")
            .style("text-anchor", "start")
            .attr("dx", ".3em")
            .attr("dy", ".5em");

        // make y axis
        gTool.append("g").call(d3.axisLeft(y))
        gTool.selectAll(".bar").data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d.infection_case) })
            .attr("y", function(d) { return y(d.count) })
            .attr("height", function(d) {
                return height - y(d.count)
            })
            .attr("width", x.bandwidth())
            .attr("fill", function(d) {
                return '#' + intToRGB(hashCode(d.infection_case))
            })
    })
}

function getProvince(data, province) {
    return data.province.valueOf() == province.valueOf()
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

function countData(data) {
    var returnValue = []
    var infectionCaseSet = new Set();
    for (var i = 0; i < data.length; i++) {
        var count = {"infection_case": data[i].infection_case, "count": data.filter(function(row) {
            return row.infection_case.valueOf() == data[i].infection_case.valueOf()
        }).length}
        if (infectionCaseSet.has(count.infection_case)) {

        } else {
            infectionCaseSet.add(count.infection_case)
            returnValue.push(count)
        }
    }

    return returnValue
}