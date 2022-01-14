//今日の日付を取得する
const date = new Date();
//月の始まりをセットする
date.setDate(1)
//カレンダーを取得する関数
const renderCalender = () => {
  //今月を取得
  const month = date.getMonth();
  //htmlから日付を入れるタグを取得
  const monthDays = document.querySelector(".days")
  //date.getMonth()+1で翌月を取得、０番目を取得することで今月の最終日が取得できる。
  const lastday = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  //上と同じ要領だがgetMonth()+1しないので前月の最終日を取得できる。
  const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate()
  //今月１日の曜日のインデックスを取得
  const firstDayIndex = date.getDay();
  //今月最終日の曜日のインデックスを取得
  const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay()
  //１週間の７日から今月最終日の曜日のインデックスを引き、０番目から始まるのでさらに１ひくことで翌月の日にちを取得
  const nextDays = 7 - lastDayIndex - 1;

  const months = [
    "January",
    "Feburary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Ausust",
    "September",
    "October",
    "November",
    "December",
  ]

  //月の英語名の配列から今月の分を取得し、テキストに追加
  document.querySelector(".date h1").innerHTML = months[month]
  //日にちを取得し月の下に入れる
  document.querySelector(".date p").innerHTML = new Date().toDateString();

  let days = "";
  //今月の１日のインデックスをxに入れて、前月の最終日も使って前月の日にちを入れる
  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class="prev-date">${prevLastDay - x + 1}</div>`
  }
  //今日の日付にはtodayクラスを付与して、そのほかはそのまま数字を入れる。
  for (let i = 1; i <= lastday; i++) {
    if (i === new Date().getDate() && date.getMonth() === new Date().getMonth()) {
      days += `<div class="today">${i}</div>`
    } else {
      days += `<div>${i}</div>`
    }
  }
  //上で宣言したnextDaysをカレンダーに入れる
  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="next-date">${j}</div>`
    monthDays.innerHTML = days;
  }

}
//前の矢印を押したら前月の月のカレンダーを取得する
document.querySelector(".prev").addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1)
  renderCalender();
})
//次の矢印を押したら翌月の月のカレンダーを取得する
document.querySelector(".next").addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1)
  renderCalender();
})

renderCalender();