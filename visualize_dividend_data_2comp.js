// require tickerName and tickerName_2 as global variables
var df_dividend = [['年', tickerName, tickerName_2]];
var df_div_growth = [['年', tickerName, tickerName_2]];
var df_div_rate = [['年', tickerName, tickerName_2]];
var df_yoc = [['年', tickerName, tickerName_2]];
var df_total_return = [['経過年', tickerName, tickerName_2]];

function drawDividendChart(df) {
    var chart_data = google.visualization.arrayToDataTable(df);
    var ac = new google.visualization.ColumnChart(document.getElementById('income_chart_dividend'));

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

function drawTotalReturnChart(df) {
    var chart_data = google.visualization.arrayToDataTable(df);
    var ac = new google.visualization.ColumnChart(document.getElementById('income_chart_total_return'));

    var options = {
        title: 'トータルリターン (年率)',
        focusTarget: 'category',
        series: [
            { type: 'bars', targetAxisIndex: 0 }
        ],
        vAxes: [
            { title: 'トータルリターン (年率)', format: 'percent', minValue: 0 }
        ],
        hAxes: [
            { title: '経過年' }
        ]
    };

    ac.draw(chart_data, options);
}

async function loadYearlyDividendData(tickerName, tickerName_2) {
    const response = await fetch(apiURL_y);
    const data = await response.json();
    var dividend_for_yoc = -1.0;
    var total_return = 1.0;
    var year_count = 0;
    var max_rows = 0;

    data.forEach(entry => {
        if (entry.ticker == tickerName) {

            if (dividend_for_yoc < 0) { // 最新年の分配金情報を取得
                dividend_for_yoc = parseFloat(entry.dividend.toFixed(4));
            };

            total_return = total_return * parseFloat(1 + entry.annual_return);
            year_count += 1;

            // tickername_2 のデータを入れる箇所は仮の値として 0 を入れておく
            var line1 = [entry.year_label, parseFloat(entry.dividend.toFixed(4)), 0];
            var line2 = [entry.year_label, parseFloat((Math.round(entry.d_growth * 10000) / 10000).toFixed(4)), 0];
            var line3 = [entry.year_label, parseFloat((Math.round(entry.d_rate * 10000) / 10000).toFixed(4)), 0];
            var line4 = [entry.year_label, parseFloat((Math.round(dividend_for_yoc / entry.close * 10000) / 10000).toFixed(4)), 0];
            var line5 = [year_count, parseFloat(Math.pow(total_return, (1 / year_count)).toFixed(4)) - 1, 0];

            df_dividend.splice(1, 0, line1);
            df_div_growth.splice(1, 0, line2);
            df_div_rate.splice(1, 0, line3);
            df_yoc.splice(1, 0, line4);
            df_total_return.splice(1, 0, line5);

            max_rows += 1;
        }
    });

    // 変数の値をリセット
    dividend_for_yoc = -1.0;
    total_return = 1.0;
    year_count = 0;

    var row = 1;
    var target_row = 0;

    data.forEach(entry => {
        // TickerName の行数より過去のデータは取得しない
        if (row <= max_rows) {

            if (entry.ticker == tickerName_2) {

                if (dividend_for_yoc < 0) { // 最新年の分配金情報を取得
                    dividend_for_yoc = parseFloat(entry.dividend.toFixed(4));
                };
    
                total_return = total_return * parseFloat(1 + entry.annual_return);
                year_count += 1;
    
                // max_rows + 1 - row 配列が年順になっているため、後ろから置き換えていく
                target_row = max_rows + 1 - row;
                df_dividend[target_row].splice(2, 2, parseFloat(entry.dividend.toFixed(4)));
                df_div_growth[target_row].splice(2, 2, parseFloat((Math.round(entry.d_growth * 10000) / 10000).toFixed(4)));
                df_div_rate[target_row].splice(2, 2, parseFloat((Math.round(entry.d_rate * 10000) / 10000).toFixed(4)));
                df_yoc[target_row].splice(2, 2, parseFloat((Math.round(dividend_for_yoc / entry.close * 10000) / 10000).toFixed(4)));
                df_total_return[target_row].splice(2, 2, parseFloat(Math.pow(total_return, (1 / year_count)).toFixed(4)) - 1);
            }

            row += 1;
        }
    });
    
    drawDividendChart(df_dividend);
    drawDividendGrowthChart(df_div_growth);
    drawDividendYRChart(df_div_rate);
    drawYoCChart(df_yoc);
    drawTotalReturnChart(df_total_return);
};

loadYearlyDividendData(tickerName, tickerName_2);
google.setOnLoadCallback(drawDividendChart);
google.setOnLoadCallback(drawDividendGrowthChart);
google.setOnLoadCallback(drawDividendYRChart);
google.setOnLoadCallback(drawYoCChart);
google.setOnLoadCallback(drawTotalReturnChart);
