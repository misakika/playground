const date = new Date();
date.setDate(1)
console.log(date.getDay()+ "kon")
const month = date.getMonth();
const monthDays = document.querySelector(".days")
const lastday = new Date(date.getFullYear(),date.getMonth()+1,0).getDate()
const prevLastDay = new Date(date.getFullYear(),date.getMonth(),0).getDate()

const firstDayIndex = date.getDay();
const lastDayIndex = new Date(date.getFullYear(),date.getMonth()+1,0).getDay()
console.log(lastDayIndex);
const nextDays = 7-lastDayIndex-1;
console.log(nextDays+ "lkjsfoai")

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

console.log(months[month])

document.querySelector(".date h1").innerHTML= months[month]

document.querySelector(".date p").innerHTML = date.toDateString();

let days = "";
for(let x = firstDayIndex; x>0; x--){
  days += `<div class="prev-date">${prevLastDay-x+1}</div>`
}
for(let i = 1; i<=lastday; i++){
  days +=`<div>${i}</div>`
  monthDays.innerHTML = days;
}

for(let j = 1; j<=nextDays; j++){
  days +=`<div class="next-date">${j}</div>`
  monthDays.innerHTML = days;
}