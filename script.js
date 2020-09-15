// コード内に存在する潜在的な問題を早期に発見しやすくなります。
// strictモードのコードは高速に実行することができる場合がある（JSエンジンによる最適化処理を困難にする誤りを修正するため
'use strict'

{
  const year = 2020;
  const month = 4; // 五月は4で表現

  function getCalendarBody() {
    const dates = []; //date: 日付, day: 曜日
    //1日から末日の日付を入れる。
    //末日は翌月一日の一日前という意味。= 翌月の0日を指定 = 今月の末日を指定できる
    const lastDate = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= lastDate; i++) {
      dates.push(i);
    }
    console.log(dates);
  }
  getCalendarBody();
}