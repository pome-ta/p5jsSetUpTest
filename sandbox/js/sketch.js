let num;

function setup() {
  createCanvas(400, 400);
  num = 0;
}

function draw() {
  num += 0.1;
  rgb = (sin(num) * 2.0 - 1.0) * 255;
  console.log(rgb);
  background(rgb);
}
