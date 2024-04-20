const baseHtml_mo = document.querySelector('.spreadsheets--item.js-base-mo');
const spreadsheets_mo = document.querySelector('.spreadsheets-mo');

async function loadMonthlyData(tickerName) {
  const response = await fetch(apiURL_mo);
  const data = await response.json();
  data.forEach(entry => {
    const copy = baseHtml_mo.cloneNode(true);
    copy.classList.remove('js-base');
    copy.querySelector('.spreadsheets--ticker').textContent = entry.ticker;
    copy.querySelector('.spreadsheets--month').textContent = entry.month_label;
    copy.querySelector('.spreadsheets--dividend').textContent = "$"+entry.dividend.toFixed(4);
    if (entry.ticker == tickerName){spreadsheets_mo.appendChild(copy)};
  });

  // tbody要素にある最後の行（tr要素）を削除
  spreadsheets_mo.deleteRow(0);
}

loadMonthlyData(tickerName);
