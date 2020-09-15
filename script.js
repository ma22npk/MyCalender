// コード内に存在する潜在的な問題を早期に発見しやすくなります。
// strictモードのコードは高速に実行することができる場合がある（JSエンジンによる最適化処理を困難にする誤りを修正するため
'use strict'

console.clear()

{
  const today = new Date();
  //getFullYearメソッドは四桁の整数で年を取得する
  let year = today.getFullYear();
  let month = today.getMonth(); // 五月は4で表現

  //末日の日付 = d
  //個数 = n
  //今月一日のオブジェクト new Date(year, month, 1)
  //先日の末日 = new Date(year, month, 0)
  //d = new Date(year, month, 0).getDate()
  //n = new Date(year, month, 1).getDay()
  function getCalendarHead() {
    const dates = [];
    const d = new Date(year, month, 0).getDate();
    const n = new Date(year, month, 1).getDay();

    for (let i = 0; i < n; i++) {
      //30 = d
      //29, 30
      //28, 29, 30
      dates.unshift({
        date: d - i,
        isToday: false,
        isDisabled: true,
      });
    }
    return dates;
  }

  function getCalendarBody() {
    const dates = []; //date: 日付, day: 曜日
    //1日から末日の日付を入れる。
    //末日は翌月一日の一日前という意味。= 翌月の0日を指定 = 今月の末日を指定できる
    const lastDate = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= lastDate; i++) {
      dates.push({
        date: i,
        isToday: false,
        isDisabled: false,
      });
    }
    //年と月が両方とも現在か調べて、現在だったら処理を実行する。
    if (year === today.getFullYear() && month === today.getMonth()) {
      //本日の日付を太字にする
      dates[today.getDate() - 1].isToday = true;
    }

    return dates;
  }



  function getCalendarTail() {
    const dates = [];
    const lastDay = new Date(year, month + 1, 0).getDay();

    for (let i = 1; i < 7 - lastDay; i++) {
      dates.push({
        date: i,
        isToday: false,
        isDisabled: true,
      });
    }
    return dates;
  }

  function clearCalendar() {
    const tbody = document.querySelector('tbody');
    //tbodyの最初の要素がある限りtbodyの最初の要素を削除する
    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }
  }


  function renderTitle() {
    //年月をHTMLに描画する
    //padStart関数で月が一桁の時は二桁で表示(padStart関数は文字列にしか使えない！)
    const title = `${year}/${String(month + 1).padStart(2, '0')}`;
    document.getElementById('title').textContent = title;
  }

  function renderWeeks() {
    const dates = [
      ...getCalendarHead(),
      ...getCalendarBody(),
      ...getCalendarTail(),
    ];

    const weeks = [];
    const weeksCount = dates.length / 7;

    for (let i = 0; i < weeksCount; i++) {
      //spliceメソッド = 要素を取り除く、置き換える、追加する
      //datesから七日分のデータを取る 先頭から七日分を削除しつつ取り出す
      weeks.push(dates.splice(0, 7));
    }
    weeks.forEach(week => {
      const tr = document.createElement('tr');
      week.forEach(date => {
        const td = document.createElement('td');

        td.textContent = date.date;
        if (date.isToday) {

          td.classList.add('today');
        }
        if (date.isDisabled) {
          td.classList.add('disabled')
        }
        tr.appendChild(td);
      });
      document.querySelector('tbody').appendChild(tr);
    });
  }

  function createCalendar() {
    clearCalendar();
    renderTitle();
    renderWeeks();
  }


  document.getElementById('prev').addEventListener('click', () => {
    month--;
    if (month < 0) {
      year--;
      month = 11;
    }
    createCalendar();
  });
  document.getElementById('next').addEventListener('click', () => {
    month++;
    if (month > 11) {
      year++;
      month = 0;
    }
    createCalendar();
  });
  document.getElementById('today').addEventListener('click', () => {
    year = today.getFullYear();
    month = today.getMonth();

    createCalendar();
  });
  createCalendar();
}