let data;

let week = [
  '日',//0番
  '月',//1番...
  '火',
  '水',
  '木',
  '金',
  '土',
];

async function preload(){
  getData();
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  //translate(0, 40);//キャンバスをずらす
  //textAlign(CENTER);
  textFont('Arial Black')

  let date = new Date();//Date オブジェクトを取得
  let year = date.getFullYear();//現在の西暦を取得
  let month = date.getMonth() + 1;//現在の月
  let day = date.getDate();//現在の日
  let dow = date.getDay();//現在の曜日

  let hour = date.getHours();//現在の時
  let minute = date.getMinutes();//現在の分
  let second = date.getSeconds();//現在の秒

  textSize(30);
  textStyle(BOLD);

  text(year + '/' + month + '/' + day + '(' + week[dow] + ')', 70, 150);
  text(hour + ':' + minute + ':' + second, 110, 250);
  
  //温度
  text(data.current.temperature_2m + '度', 120, 300);

}
//draw関数でlet dataを呼び出しちゃダメ！！　天気情報くれって1秒に60回60回言うことになっちゃう。



//天気情報を取得
async function getData(){
  data = await loadJSON('https://api.open-meteo.com/v1/forecast?latitude=36.5667&longitude=139.8833&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,dew_point_2m,precipitation_probability,rain,weather_code&current=temperature_2m,relative_humidity_2m,is_day&timezone=Asia%2FTokyo&forecast_days=1')
  console.log(data);
}