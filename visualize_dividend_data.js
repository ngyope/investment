var df1 = [['年', '分配金']];
var df2 = [['年', '増配率']];
var df3 = [['年', '分配金利回り']];
var df4 = [['年', 'YoC']];

function drawDividendChart(df) {
  var chart_data = google.visualization.arrayToDataTable(df);
  var ac = new google.visualization.ColumnChart(document.getElementById('income_chart_dividend'));

  // var formatter = google.visualization.NumberFormat({
  //   pattern: '$#,###'
  // });

  // formatter.format(chart_data, 1); //書き換える対象データの指定

  var options = {
    title: '分配金 (配当) の推移',
    focusTarget: 'category',
    series: [
      { type: 'bars', targetAxisIndex: 0 }
    ],
    vAxes: [
      { title: '分配金(年間)', format: 'currency', minValue: 0 }
    ]
  };

  ac.draw(chart_data, options);
}

function drawDividendGrowthChart(df) {
  var chart_data = google.visualization.arrayToDataTable(df);
  var ac = new google.visualization.SteppedAreaChart(document.getElementById('income_chart_dividend_growth'));

  var options = {
    title: '分配金 (配当) の増配率の推移',
    focusTarget: 'category',
    series: [
      { type: 'lines', targetAxisIndex: 0 }
    ],
    vAxes: [
      { title: '分配金(年間)', format: 'percent', minValue: -1, maxValue: 1 }
    ]
  };

  ac.draw(chart_data, options);
}

function drawDividendYRChart(df) {
  var chart_data = google.visualization.arrayToDataTable(df);
  var ac = new google.visualization.LineChart(document.getElementById('income_chart_dividend_yr'));

  var options = {
    title: '分配金利回り (配当利回り) 推移',
    focusTarget: 'category',
    series: [
      { type: 'lines', targetAxisIndex: 0 }
    ],
    vAxes: [
      { title: '分配金利回り', format: 'percent' }
    ]
  };

  ac.draw(chart_data, options);
}

function drawYoCChart(df) {
  var chart_data = google.visualization.arrayToDataTable(df);
  var ac = new google.visualization.LineChart(document.getElementById('income_chart_yoc'));

  var options = {
    title: 'YoC (Yield on Cost) 推移',
    focusTarget: 'category',
    series: [
      { type: 'lines', targetAxisIndex: 0 }
    ],
    vAxes: [
      { title: 'YoC (Yield on Cost)', format: 'percent' }
    ]
  };

  ac.draw(chart_data, options);
}

async function loadYearlyDividendData(tickerName) {
  const response = await fetch(apiURL_y);
  const data = await response.json();
  var dividend_for_yoc = -1.0;

  data.forEach(entry => {
    if (entry.ticker == tickerName) {
    
      if (dividend_for_yoc < 0) { // 最新年の分配金情報を取得
        dividend_for_yoc = parseFloat(entry.dividend.toFixed(4));
      };

      var line1 = [entry.year_label, parseFloat(entry.dividend.toFixed(4))];
      var line2 = [entry.year_label, parseFloat((Math.round(entry.d_growth * 10000) / 10000).toFixed(4))];
      var line3 = [entry.year_label, parseFloat((Math.round(entry.d_rate * 10000) / 10000).toFixed(4))];
      var line4 = [entry.year_label, parseFloat((Math.round(dividend_for_yoc / entry.close * 10000) / 10000).toFixed(4))];
      
      df1.splice(1, 0, line1);
      df2.splice(1, 0, line2);
      df3.splice(1, 0, line3);
      df4.splice(1, 0, line4);
    }
  });

  drawDividendChart(df1);
  drawDividendGrowthChart(df2);
  drawDividendYRChart(df3);
  drawYoCChart(df4);
};

loadYearlyDividendData(tickerName);
google.setOnLoadCallback(drawDividendChart);
google.setOnLoadCallback(drawDividendGrowthChart);
google.setOnLoadCallback(drawDividendYRChart);
google.setOnLoadCallback(drawYoCChart);
//       $(window).resize(function(){
//     drawChart();
//   });
