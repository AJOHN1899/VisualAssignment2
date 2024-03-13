// step 1 select the svg element
let svg = d3.select('svg');

//step 2 read the database
//const url = "https://raw.githubusercontent.com/AJOHN1899/VisualAssignment2/main/data_sample(1).csv"
d3.csv(url)
  .then(function (data) {
    //step 3 get the data and svg element extent
    //svg extent
    let rng = svg.attr('viewBox').split('')
    rng = d3.map(rng,function (d){return parseInt(d)})
    let xRng = [rng[0],rng[2]];
    let yRng = [rng[1],rng[3]];

    console.log(rng)
   

    //data extent (domain)
    let data_extent = d3.extent(data,
        function (d){return d.date})
        console.log(data_extent)
    let EstimatedCost_extent = d3.extent(data,
        function (d){return d.EstimatedCost})
        console.log(EstimatedCost_extent)

    //step 4 make the X and Y initial-scale
    let xScale = d3.scaleTime().domain(data_extent).range(xRng)
    let yScale = d3.scaleLinear().domain(EstimatedCost_extent).range(yRng)

    //step 5 make the  line generator
    let EstimatedCost_line = d3.line()
        .x(function (d){return xScale(d.date)})
        .y(function (d){return yScale(d.EstimatedCost)})

    //step 6 add path element to the svg
    let flg = svg.append('g');
    //there is one path for each cost so data is only added as one array
    flg = flg.data([data]);
    flg.append('path').attr("d", function (d){return EstimatedCost_line(d)})


  })

