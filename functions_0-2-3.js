const baseHtml_y = document.querySelector('.spreadsheets--item.js-base-y');
const spreadsheets_y = document.querySelector('.spreadsheets-y');
const apiURL_y = 'https://script.google.com/macros/s/AKfycbxCgxVLRXgZtow0mRXYadWtb9YreVXvTfzhiidarBzFbCxNXvKeSezusALt_JxeXbWDvA/exec';

async function loadYearlyData(tickerName) {
  const response = await fetch(apiURL_y);
  const data = await response.json();
  data.forEach(entry => {
    const copy = baseHtml_y.cloneNode(true);
    copy.classList.remove('js-base');
    copy.querySelector('.spreadsheets--ticker').textContent = entry.ticker;
    copy.querySelector('.spreadsheets--year').textContent = entry.year;
    copy.querySelector('.spreadsheets--dividend').textContent = "$"+entry.dividend.toFixed(4);
    copy.querySelector('.spreadsheets--d_growth').textContent = (Math.round(entry.d_growth*10000)/100).toFixed(2)+"%";
    copy.querySelector('.spreadsheets--close').textContent = "$"+entry.close;
    copy.querySelector('.spreadsheets--d_rate').textContent = (Math.round(entry.d_rate*10000)/100).toFixed(2)+"%";
    if (entry.ticker == tickerName){spreadsheets_y.appendChild(copy)};
  });

  // tbody要素にある最後の行（tr要素）を削除
  spreadsheets_y.deleteRow(0);
}

loadYearlyData(tickerName);
