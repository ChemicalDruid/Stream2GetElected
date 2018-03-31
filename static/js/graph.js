queue()
    .defer(d3.json, "/donorsUS/projects")
    .await(makeGraphs);
 
function makeGraphs(error, projectsJSON) {
    if (error) {
        console.error("makeGraphs error on receiving dataset:", error.statusText);
        throw error;
    }
 
    //Clean donorsUSProjects data
    var donorsUSProjects = projectsJSON;
    var dateFormat = d3.time.format("%Y-%m-%d %H:%M:%S");
    donorsUSProjects.forEach(function (d) {
        d["date_posted"] = dateFormat.parse(d["date_posted"]);
        d["date_posted"].setDate(1);
        d["total_donations"] = +d["total_donations"];
    });
 
 
    //Create a Crossfilter instance
    var ndx = crossfilter(donorsUSProjects);
 
    //Define Dimensions
    var dateDim = ndx.dimension(function (d) {
        return d["date_posted"];
    });
    var resourceTypeDim = ndx.dimension(function (d) {
        return d["resource_type"];
    });
    var povertyLevelDim = ndx.dimension(function (d) {
        return d["poverty_level"];
    });
    var cityDim = ndx.dimension(function (d) {
        return d["school_city"];
    });
    var fundingStatus = ndx.dimension(function (d) {
        return d["funding_status"];
    });
    var areaDim = ndx.dimension(function (d) {
        return d['school_metro']
    });
    var subjectDim = ndx.dimension(function (d) {
        return d["primary_focus_subject"];
    });
    var gradeDim = ndx.dimension(function (d) {
        return d['grade_level']
    });

 
    //Calculate metrics
    var numProjectsByDate = dateDim.group();
    var numProjectsByResourceType = resourceTypeDim.group();
    var numProjectsByPovertyLevel = povertyLevelDim.group();
    var numProjectsByFundingStatus = fundingStatus.group();
    var numPFSubject = subjectDim.group();
    var numGradeRange = gradeDim.group();
    var numArea = areaDim.group();
    var cityGroup = cityDim.group();

    var all = ndx.groupAll();
    var totalDonations = ndx.groupAll().reduceSum(function (d) {
        return d["total_donations"];
    });

    //Define values (to be used in charts)
    var minDate = dateDim.bottom(1)[0]["date_posted"];
    var maxDate = dateDim.top(1)[0]["date_posted"];
 
    //Charts
    var timeChart = dc.lineChart("#time-chart");
    var resourceTypeChart = dc.rowChart("#resource-type-row-chart");
    var povertyLevelChart = dc.rowChart("#poverty-level-row-chart");
    var numberProjectsND = dc.numberDisplay("#number-projects-nd");
    var totalDonationsND = dc.numberDisplay("#total-donations-nd");
    var fundingStatusChart = dc.pieChart("#funding-chart");
    var pFSubjectChart = dc.pieChart("#subject-chart");
    var gradeRangeChart = dc.pieChart("#grade-range-chart");
    var areaChart = dc.pieChart("#area-chart");

    var selectField = dc.selectMenu('#menu-select');

    var pieWidth = document.getElementById('size-pie').offsetWidth;

    selectField
        .dimension(cityDim)
        .group(cityGroup);

    numberProjectsND
        .formatNumber(d3.format("d"))
        .valueAccessor(function (d) {
            return d;
        })
        .group(all);
 
    totalDonationsND
        .formatNumber(d3.format("d"))
        .valueAccessor(function (d) {
            return d;
        })
        .group(totalDonations)
        .formatNumber(d3.format(".3s"));
 
    timeChart
        .ordinalColors(["#C96A23"])
        .width(900)
        .height(250)
        .margins({top: 30, right: 50, bottom: 30, left: 50})
        .dimension(dateDim)
        .group(numProjectsByDate)
        .renderArea(true)
        .transitionDuration(500)
        .x(d3.time.scale().domain([minDate, maxDate]))
        .elasticY(true)
        .xAxisLabel("Year")
        .yAxis().ticks(6);
 
     resourceTypeChart
        .ordinalColors(["#79CED7", "#66AFB2", "#C96A23", "#D3D1C5", "#F5821F"])
        .width(450)
        .height(220)
        .dimension(resourceTypeDim)
        .group(numProjectsByResourceType)
        .elasticX(true)
        .xAxis().ticks(4);
 
    povertyLevelChart
        .ordinalColors(["#79CED7", "#66AFB2", "#C96A23", "#D3D1C5", "#F5821F"])
        .width(450)
        .height(250)
        .dimension(povertyLevelDim)
        .group(numProjectsByPovertyLevel)
        .elasticX(true)
        .xAxis().ticks(4);
 
    fundingStatusChart
        .ordinalColors(["#79CED7", "#66AFB2", "#C96A23", "#D3D1C5", "#F5821F"])
        .height(220)
        .radius((pieWidth / 2) - 30)
        .innerRadius(40)
        .transitionDuration(1500)
        .dimension(fundingStatus)
        .group(numProjectsByFundingStatus);
 
     pFSubjectChart
        .height(220)
        .radius((pieWidth / 2) - 30)
        .innerRadius(0)
//        .colors(colourScale)
        .transitionDuration(1500)
        .dimension(subjectDim)
        .group(numPFSubject)
        .transitionDuration(600);

    gradeRangeChart
        .height(220)
        .radius((pieWidth / 2) - 30)
        .innerRadius(40)
//        .colors(colourScale)
        .transitionDuration(1500)
        .dimension(gradeDim)
        .group(numGradeRange)
        .transitionDuration(600);

    areaChart
        .height(220)
        .radius((pieWidth / 2) - 30)
        .innerRadius(0)
//        .colors(colourScale)
        .transitionDuration(1500)
        .dimension(areaDim)
        .group(numArea)
        .transitionDuration(600);

    dc.renderAll();
}
