async function loadAnnualReturn(tickerName) {
  const baseHtml_ar = document.querySelector('.spreadsheets--item.js-base-ar');
  const spreadsheets_ar = document.querySelector('.spreadsheets-ar');
  const response = await fetch(apiURL_y);
  const data = await response.json();
  
  data.forEach(entry => {
    const copy = baseHtml_ar.cloneNode(true);
    copy.classList.remove('js-base-ar');
    
    if (entry.ticker == tickerName) { 
      copy.querySelector('.spreadsheets--ticker').textContent = entry.ticker;
      copy.querySelector('.spreadsheets--month').textContent = entry.month_label;
      copy.querySelector('.spreadsheets--dividend').textContent = "$"+entry.dividend.toFixed(4);
      spreadsheets_mo.appendChild(copy);
    });

  // tbody要素にある最後の行（tr要素）を削除
  spreadsheets_ar.deleteRow(0);
}

loadAnnualReturn(tickerName);
