import { Fruit } from './Fruit.js'//輸入

let { Engine, Bodies, Composite } = Matter;//モジュールを変数化
let engine;//物理演算用の空間

function setup() {
  createCanvas(400, 400);

  engine = Engine.create();

  // //Fruitインスタンスを生成
  // let apple = new Fruit('apple', 200, 200, engine.world);

  //箱を生成
  let boxA = Bodies.rectangle(150, 200, 120, 120);//x, y, 幅, 高さ
  let boxB = Bodies.rectangle(200, 0, 80, 80);
  let ball = Bodies.circle(120, 30, 50);
  let ground = Bodies.rectangle(200, 350, 380, 50, {isStatic: true});

  //箱を世界に配置
  Composite.add(engine.world, [boxA, boxB, ball, ground]);
}

function draw() {
  background(220);

  //世界に配置された全ての物体を取得（配列）
  let bodies = Composite.allBodies(engine.world);

  for(let i = 0; i < bodies.length; i++){
    if (bodies[i].fruit)bodies[i].fruit.draw();
    else drawBody(bodies[i]);
  }

  //世界の更新(1フレーム時間を進める)
  Engine.update(engine,deltaTime);


}

//自作関数:　引数で渡された物体を描画する
function drawBody(body){
  let v = body.vertices;//物体の頂点（配列）
  beginShape();//多角形描画開始
  for (let i = 0; i < v.length; i++){
    vertex(v[i].x, v[i].y);
  }
  endShape(CLOSE);//多角形描画終了
}

//クリックをすると実行
function mousePressed(){
  new Fruit('orange', mouseX, mouseY, engine.world);
}


//type="module"の場合は以下が必要
window.setup = setup;
window.draw = draw;
window.mousePressed = mousePressed;