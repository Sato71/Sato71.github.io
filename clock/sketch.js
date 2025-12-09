let data;
//背景　先生
let sky;

let week = [
  '日',//0番
  '月',//1番...
  '火',
  '水',
  '木',
  '金',
  '土',
];

// async function preload(){
//   getData();
// }

function setup() {
  createCanvas(windowWidth, windowHeight);
  getData();//天気の取得開始

  // let dog; // 犬
  // console.log("リクエスト開始。");
  // loadJSON("https://dog.ceo/api/breeds/image/random", function(data) { // コールバック関数
  //   console.log("データ取得完了:", data);
  //   dog = data; // 取得データを明け渡す
  // });
  // console.log("データ取得中...");
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}


function draw() {
  //時間で背景の色が移り変わる。自作
  // let h = hour();
  // let c = map(h, 0, 23, 0, 200);
  // background(0, c, 200);
  
  //背景　先生
  loadImage('sky.png', newImg =>{

  });

  let cx = width / 2;
  let cy = height / 2;

  //translate(0, 40);//キャンバスをずらす
  //textAlign(CENTER);
  textFont('Arial Black')

  let date = new Date();//Date オブジェクトを取得
  let year = date.getFullYear();//現在の西暦を取得
  let month = date.getMonth() + 1;//現在の月
  let day = date.getDate();//現在の日
  let dow = date.getDay();//現在の曜日

  let currenthour = date.getHours();//現在の時
  let minute = date.getMinutes();//現在の分
  let second = date.getSeconds();//現在の秒

  //背景　先生
  if(sky){
    let skyColor = sky.get(h * 10, 10);
    background(skyColor);
  }

  textAlign(CENTER);
  textSize(30);
  textStyle(BOLD);
  text(year + '/' + month + '/' + day + '(' + week[dow] + ')', cx, cy - 40);
  text(currenthour + ':' + minute + ':' + second, cx, cy);
  
  if(data){//データが取得済みなら
   //温度
   text(data.current.temperature_2m + '度', cx, cy + 60);
  }
  

}
//draw関数でlet dataを呼び出しちゃダメ！！　天気情報くれって1秒に60回60回言うことになっちゃう。



//天気情報を取得　自作の関数
function getData(){
  loadJSON('https://api.open-meteo.com/v1/forecast?latitude=36.5667&longitude=139.8833&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,dew_point_2m,precipitation_probability,rain,weather_code&current=temperature_2m,relative_humidity_2m,is_day&timezone=Asia%2FTokyo&forecast_days=1', newData => {
    data = newData;//データ取得完了
    console.log(data);
  });
}