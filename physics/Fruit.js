let { Engine, Bodies, Composite } = Matter;//モジュールを変数化

class Fruit{
    constructor(type, x, y, world){
        console.log('果物:' + type + 'ができました。');
        this.type = type;//自分の果物タイプ
        this.data = data[type];
        this.body = Bodies.circle(x, y, this.data.size);//物理的な実体 this.bodyで保持
        this.body.fruit = this;//ここあってるかわからん！！！！！！！
        this.world = world;
        Composite.add(world, this.body);
    }

    draw(){
        push();
        fill(this.data.color);
        let v = this.body.vertices;//物体の頂点（配列）
        beginShape();//多角形描画開始
        for (let i = 0; i < v.length; i++){
        vertex(v[i].x, v[i].y);
        }
        endShape(CLOSE);//多角形描画終了
        pop();
    }

    hit(b, fruit){
        if(fruit){
            console.log('私は'+this.type);
            console.log(fruit.type + 'とぶつかったよ');
            if(this.type == fruit.type){//　==これは前期で習った
                //相手が同じtypeだったら
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
        let dy = (bx - ay) / 2;

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
        
    }
}

let data = {
    cherry:{
        color: '#dd1111',
        size: '10',
        next: 'berry',
    },
    berry:{
        color: 'crimson',
        size: '20',
        next: 'grape',
    },
    grape:{
        color: 'purple',
        size: '30',
        next: 'orange',
    },
    orange:{
        color: 'orange',
        size: '40',
        next: 'kaki',
    },
    // kaki:{
    //     color: '#ff6200',
    //     size: '50',
    //     next: 'apple',
    // },
    // apple:{
    //     color: 'red',
    //     size: '55',
    //     next: 'peach',
    // },
    // peach:{
    //     color: '#ffbaf5',
    //     size: '60',
    //     next: 'melon',
    // },
    // melon:{
    //     color: '#36ff5a',
    //     size: '70',
    //     next: 'watermelon',
    // },
};

export{Fruit};//フルートクラスを輸出する