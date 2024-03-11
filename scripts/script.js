const url = "https://raw.githubusercontent.com/AJOHN1899/VisualAssignment2/main/data_sample(1).csv"

d3.csv(url)
  .then(function (d) {

    let filtered_data = d.filter(d=>{
      return {
      }
    })
    filtered_data = filtered_data.map(d=>{
      return {
      date: d3.utcFormat("%x")(new Date(d['date'])),
      EstimatedCost: +d.EstimatedCost,
      RawMaterial: +d.RawMaterial,
      Workmanship: +d.Workmanship,
      StorageCost: +d.StorageCost,
      ActualCost: +d.RawMaterial + +d.Workmanship + +d.StorageCost,
      SoldPrice: d3.format(".2f")(+d.EstimatedCost * 1.1),
      MarginofProfit: d3.format(".2f")((+d.EstimatedCost * 1.1) - (+d.RawMaterial + +d.Workmanship + +d.StorageCost) ),
      }
    })

      console.log(d);
      console.log(filtered_data);
    var columnsTitle = ['date','EstimatedCost','RawMaterial','Workmanship', 'StorageCost', 'ActualCost', 'SoldPrice', 'MarginofProfit']
    tabular(filtered_data,columnsTitle)
    });



var tabular = function (data,columns) {
  var table = d3.select('body').append('table')
    var tablehead = table.append('thead')
    var tablebody = table.append('tbody')

    // create a cell in each row for each column
    tablehead.append('tr')
      .selectAll('th')
      .data(columns)
      .enter()
      .append('th')
      //.html(function(d) {
      //  return '<td>date</td><td>Estimated Cost</td><td>Raw Material</td><td>Workmanship</td><td>Storage Cost</td><td>Actual Cost</td>'
      //})
      .text(function (d) { return d })
        
    // create a row for each object in the data
    var rows = tablebody.selectAll('tr')
      .data(data)
      .enter()
      .append('tr')

    // create a cell in each row for each column
    var cells = rows.selectAll('td')
      .data(function(row) {
        return columns.map(function (columnName) {
          return { column: columnName, value: row[columnName]}             
            })              
          })
      .enter()
      .append('td')
      .text(function (d) { return d.value })
      
  return table;
}
