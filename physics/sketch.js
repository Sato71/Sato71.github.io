import { Fruit } from './Fruit.js';//輸入
import { ShapeStage } from './shapes.js';//形状データを輸入
import { drawBody } from './util.js';

let { Engine, Bodies, Composite, Events } = Matter;//モジュールを変数化
let engine;//物理演算用の空間

//
let se = {};
Fruit.se = se;//なんか先生元々回いてた

//シーン
let scene = 'title';

//次に落ちる果物
let nextFruit = 'cherry';

function setup() {
  createCanvas(400, 400);

  console.log(ShapeStage);

  loadSound('./assets/pon_cute.wav', data => {
    se.pon_cute = data;//自　効果音
  });

  engine = Engine.create();

  // //Fruitインスタンスを生成
  // let apple = new Fruit('apple', 200, 200, engine.world);

  //箱を生成
  let ball = Bodies.circle(120, 30, 50);//???????
  //let ground = Bodies.rectangle(200, 350, 380, 50, {isStatic: true});
  let stage = Bodies.fromVertices(200, 300, ShapeStage, {isStatic: true});

  //箱を世界に配置
  Composite.add(engine.world, stage);

  //物体同士が衝突したとき、コールバックを実行させる
  Events.on(engine, 'collisionStart', ev => {
    for(let i = 0; i < ev.pairs.length; i++){
      let pair = ev.pairs[i];//衝突したペア
      let a = pair.bodyA.parent;//衝突物A
      let b = pair.bodyB.parent;//衝突物B
      if (a.fruit){//Aがfruitだったら
        a.fruit.hit(b, b.fruit);
      }
    }
  });
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
  
  if (scene == 'title'){//タイトル画面だったら
    textAlign(CENTER);
    textSize(50);
    text('Fruit Game', 200, 200);//ゲームの名前、キャンバスは変えていい！！

  }else if(scene=='play'){
    textAlign(LEFT);
    textSize(20);
    text('Next: '+nextFruit,20,40);
  }
}

//クリックをすると実行　　　ここ復習したい！
function mousePressed(){
  if (scene == 'title'){//タイトル画面
    scene = 'play';//プレイ画面
  }else if (scene == 'play'){//プレイ画面
  //Fruitインスタンスを生成
  new Fruit(nextFruit, mouseX, 80, engine.world);
  let choices=[
    'cherry',
    'berry',
    'grape',
  ];
  let choice=round(random(0,2));
  nextFruit=choices[choice];
  }
}


//type="module"の場合は以下が必要
window.setup = setup;
window.draw = draw;
window.mousePressed = mousePressed;