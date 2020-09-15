// コード内に存在する潜在的な問題を早期に発見しやすくなります。
// strictモードのコードは高速に実行することができる場合がある（JSエンジンによる最適化処理を困難にする誤りを修正するため
'use strict'

console.clear()

{
  const year = 2020;
  const month = 4; // 五月は4で表現

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

function createCalendar() {
  const dates = [
...getCalendarHead(),
...getCalendarBody(),
...getCalendarTail(),
];
console.log(dates);

}
createCalendar();

}