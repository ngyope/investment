const baseHtml_mo = document.querySelector('.spreadsheets--item.js-base-mo');
const spreadsheets_mo = document.querySelector('.spreadsheets-mo');
const apiURL_mo = 'https://script.google.com/macros/s/AKfycbw2OG8sH3W8SG5__LKvp1HW0ymGWbZwRjdMI6UrQFKgL7GdazOWQYz1lFmQi-paEULSZw/exec';

async function loadMonthlyData(tickerName) {
  const response = await fetch(apiURL_mo);
  const data = await response.json();
  data.forEach(entry => {
    const copy = baseHtml_mo.cloneNode(true);
    copy.classList.remove('js-base');
    copy.querySelector('.spreadsheets--ticker').textContent = entry.ticker;
    copy.querySelector('.spreadsheets--month').textContent = entry.month_label;
    copy.querySelector('.spreadsheets--dividend').textContent = "$"+entry.dividend.toFixed(4);
    copy.querySelector('.spreadsheets--d_comp_lead1').textContent = (Math.round(entry.d_comp_lead1*10000)/100).toFixed(2)+"%";
    copy.querySelector('.spreadsheets--d_comp_ly').textContent = (Math.round(entry.d_comp_ly*10000)/100).toFixed(2)+"%";
    if (entry.ticker == tickerName){spreadsheets_mo.appendChild(copy)};
  });

  // tbody要素にある最後の行（tr要素）を削除
  spreadsheets_mo.deleteRow(0);
}

loadMonthlyData(tickerName);
