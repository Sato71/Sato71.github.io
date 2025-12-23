let { Engine, Bodies, Composite } = Matter;//モジュールを変数化

class Fruit{
    constructor(type, x, y, world){
        console.log('果物:' + type + 'ができました。');
        this.type=type;
        this.data=data[type];
        this.body = Bodies.circle(x, y, this.data.size);//物理的な実体 this.bodyで保持
        this.body.fruit = this;//ここあってるかわからん！！！！！！！
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
}

let data = {
    berry:{
        color: 'crimson',
        size: '20',
        next: 'grape',
    },
    grape:{
        color: 'grape',
        size: '30',
        next: 'orange',
    },
    orange:{
        color: 'orange',
        size: '40',
        next: 'kaki',
    },
};

export{Fruit};//フルートクラスを輸出する