const baseHtml_mo = document.querySelector('.spreadsheets--item.js-base-mo');
const spreadsheets_mo = document.querySelector('.spreadsheets-mo');
var df_monthly_dividend = [];

async function loadMonthlyData(tickerName) {
  const response = await fetch(apiURL_mo);
  const data = await response.json();
  data.forEach(entry => {
    const copy = baseHtml_mo.cloneNode(true);
    if (entry.ticker == tickerName){
      copy.classList.remove('js-base');
      copy.querySelector('.spreadsheets--ticker').textContent = entry.ticker;
      copy.querySelector('.spreadsheets--month').textContent = entry.month_label;
      copy.querySelector('.spreadsheets--dividend').textContent = "$"+entry.dividend.toFixed(4);
      spreadsheets_mo.appendChild(copy)

      df_monthly_dividend.push([entry.ticker, entry.month_label, entry.dividend.toFixed(4)]);
    };
  });

  // tbody要素にある最後の行（tr要素）を削除
  spreadsheets_mo.deleteRow(0);

  document.getElementById('latest-div-month').textContent = df_monthly_dividend[0][1];
  document.getElementById('latest-monthly-div').textContent = df_monthly_dividend[0][2];
  document.getElementById('latest-monthly-div-change-rate').textContent = ((df_monthly_dividend[0][2] / df_monthly_dividend[1][2]).toFixed(4) * 100) + "%";
}

loadMonthlyData(tickerName); 
