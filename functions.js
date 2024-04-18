const tickerName = "PFFD"
const baseHtml = document.querySelector('.spreadsheets--item.js-base');
const spreadsheets = document.querySelector('.spreadsheets');
const apiURL = 'https://script.google.com/macros/s/AKfycbxCgxVLRXgZtow0mRXYadWtb9YreVXvTfzhiidarBzFbCxNXvKeSezusALt_JxeXbWDvA/exec';

async function loadData() {
  const response = await fetch(apiURL);
  const data = await response.json();
  data.forEach(entry => {
    const copy = baseHtml.cloneNode(true);
    copy.classList.remove('js-base');
    copy.querySelector('.spreadsheets--ticker').textContent = entry.ticker;
    copy.querySelector('.spreadsheets--year').textContent = entry.year;
    copy.querySelector('.spreadsheets--dividend').textContent = "$"+entry.dividend.toFixed(4);
    copy.querySelector('.spreadsheets--d_growth').textContent = (Math.round(entry.d_growth*10000)/100).toFixed(2)+"%";
    copy.querySelector('.spreadsheets--close').textContent = "$"+entry.close;
    copy.querySelector('.spreadsheets--d_rate').textContent = (Math.round(entry.d_rate*10000)/100).toFixed(2)+"%";
    if (entry.ticker == tickerName){spreadsheets.appendChild(copy)};
  });
