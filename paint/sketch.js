//1フレーム前のカーソルの位置
let px = 0;
let py = 0;

let sw = 5;//線の太さ

let colorInput;//カラーピッカーを入れる変数　そもそもhtmlにinputでカラーピッカーを入れている。
let dataInput;

function setup() {
  createCanvas(512, 512);
  pixelDensity(1);//ピクセル深度
  background(255);//背景白

  let data = getItem('paint');
  console.log('ロードしました',data);
  decodePixels(data);

  noFill();

  colorInput = select('#color');//色選択UIを取得
  dataInput = select('#data');
}

function draw() {
  if (keyIsDown(70) && sw < 80){//Fキー
    sw++;//太くする
  } else if (keyIsDown(68) && sw > 1){//Dキー
    sw--;//細くする
  }

  strokeWeight(sw);//線の太さ

  if (mouseIsPressed){//マウスボタンを押している時
    line(px, py, mouseX, mouseY);//(始点xyと終点xy)
    px = mouseX;
    py = mouseY;//代入することで位置が更新される。
  }

}

//マウスボタンを押した瞬間に一回実行　線をクリックしたときに直線で結ばれることを解決するために書いてた。
function mousePressed(){
  stroke(colorInput.value());//線の色を変える。　ストロークってなんだ？
  px = mouseX;//ここでも更新する。
  py = mouseY;
  point(mouseX,mouseY);
}

function mouseReleased(){
  console.log('マウス離されました。');

  //loadPixels();//キャンバスの画素データが読み込まれる。ここ消す？？？？
  //console.log(pixels);
  
  let data = encodePixels();
  console.log(data);

  storeItem('paint',data)//ブラウザに保存する関数。(名前,データ);　マウスから離された時に保存。
}

function encodeInput(){
  console.log('エンコード');
  let data = encodePixels();
  dataInput.value(data);//テキストエリアに文字列を入れる
}

function decodeInput(){
  console.log('デコード');
  decodePixels(dataInput.value());
}