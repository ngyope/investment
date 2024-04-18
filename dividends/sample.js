        const output_svg = document.getElementById('color_list');
    
    function csv_data(dataPath) {
        const request = new XMLHttpRequest(); // HTTPでファイルを読み込む
        request.addEventListener('load', (event) => { // ロードさせ実行
            const response = event.target.responseText; // 受け取ったテキストを返す
            output_svg.innerHTML = response; // 表示
        });
        request.open('GET', dataPath, true); // csvのパスを指定
        request.send();
    }
    csv_data('https://github.com/ngyope/investment/blob/main/dividends/etf_dividend_monthly%20-%20data.csv'); // csvのパス
