import { ShapeCherry, ShapeBerry, ShapeGrape, ShapeOrange, ShapeKaki, ShapeApple, ShapePeach, ShapeMelon } from './shapes.js'
import { drawBody, scaleShape } from './util.js'

let { Engine, Bodies, Composite } = Matter;//モジュールを変数化

class Fruit{
    constructor(type, x, y, world){
        console.log('果物:' + type + 'ができました。');
        this.merged = false;//合成済みかどうか
        this.type = type;//自分の果物タイプ
        this.data = data[type];

        if(this.data.shape){
            this.body = Bodies.fromVertices(x, y, this.data.shape);
        }else {
            this.body = Bodies.circle(x, y, this.data.size);//物理的な実体 this.bodyで保持
        }
        this.body.fruit = this;

        this.world = world;//自分が属する世界
        Composite.add(world, this.body);
    }

    draw(){
        push();
        stroke(this.data.color);
        fill(this.data.color);
        drawBody(this.body);
        pop();
    }

    hit(b, fruit){
        if(this.merged) return;

        if(fruit){
            console.log('私は'+this.type);
            console.log(fruit.type + 'とぶつかったよ');
            if(this.type == fruit.type){//　==これは前期で習った
                //相手が同じtypeだったら
                this.merged = true;
                this.merge(b);//Bと合体する
            }
        }
    }

    //他のFruitと合体する処理
    merge(b){
        //A(自分)の中心点
        let ax = this.body.position.x;
        let ay = this.body.position.y;

        //B（相手）の中心点
        let bx = b.position.x;
        let by = b.position.y;

        //Aから見た衝突位置
        let dx = (bx - ax) / 2;
        let dy = (by - ay) / 2;

        //絶対衝突位置
        let x = ax + dx;
        let y = ay + dy;

        //自分自身を消す
        Composite.remove(this.world, this.body);
        //相手も消す
        Composite.remove(this.world, b);

        //進化先のtype
        let nextType = data[this.type].next;
        //進化先が存在したら
        if(data[nextType]){
            new Fruit(nextType, x, y, this.world);
        }
        
        if(Fruit.se.pon_cute)Fruit.se.pon_cute.play();//自　効果音

    }
}

let data = {
    cherry:{
        color: '#dd1111',
        size: '10',
        shape: scaleShape(ShapeCherry,0.3),
        next: 'berry',
    },
    berry:{
        color: 'crimson',
        size: '20',
        shape: scaleShape(ShapeBerry,0.22),
        next: 'grape',
    },
    grape:{
        color: 'purple',
        size: '30',
        shape: scaleShape(ShapeGrape,0.35),
        next: 'orange',
    },
    orange:{
        color: 'orange',
        size: '40',
        shape: scaleShape(ShapeOrange,0.45),
        next: 'kaki',
    },
    kaki:{
        color: '#ff6200',
        size: '50',
        shape: scaleShape(ShapeKaki,0.45),
        next: 'apple',
    },
    apple:{
        color: 'red',
        size: '55',
        shape: scaleShape(ShapeApple,0.5),
        next: 'peach',
    },
    peach:{
        color: '#ffbaf5',
        size: '60',
        shape: scaleShape(ShapePeach,0.55),
        next: 'melon',
    },
    melon:{
        color: '#36ff5a',
        size: '70',
        shape: scaleShape(ShapeMelon,0.7),
        next: 'watermelon',
    },
};

export{Fruit};//フルートクラスを輸出する