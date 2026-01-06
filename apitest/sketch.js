let data;
let img;

function preload(){
  //data = loadJSON('https://dog.ceo/api/breeds/image/random');
  data = loadJSON('');
}

async function setup() {
  createCanvas(400, 400);
  img = await loadImage(data.message);
  console.log(img);
}

function draw() {
  background(220);
  img.resize(400, 0);
  image(img, 0, 0);
}

