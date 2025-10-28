
let qrDate;//QRコードのデータを入れる変数
let url = 'http://google.com';
let input;//入力欄
let colorInput;
let bgInput;

function setup() {
  createCanvas(400, 400);
  frameRate(15);
  input = select('#url')//HTMLタグを取得する（idはurl）inputをselect関数に渡す。ここはタグだけ取得してる。下のvalueで値を取得？表示？する。
  colorInput = select('#color')
  bgInput = select('#bg')

  qrDate = qr.encodeQR(url, 'raw');//データを入れる
  console.log(qrDate);
}

function draw() {
  background(bgInput.value());

  //入力欄の値を表示する
  text(input.value(), 50, 350);//text(文字,x,y);
  textSize(30);


  //QRコードの生成
  qrDate = qr.encodeQR(input.value(), 'raw')


  noStroke();
  fill(colorInput.value());

 

  for (let y = 0; y < qrDate.length; y++){
    let line = qrDate[y];//y番目の列
    for (let x = 0; x < qrDate.length; x++){
      let cell = line[x];//列の中のx番目のセル
      if (cell){//セルがtrueなら
        circle(x * 16,y * 16, 20);//セルを塗る(セルを丸で描く)
      }
    }
  }
}

