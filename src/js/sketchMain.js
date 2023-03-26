import { p5 } from './modules/p5Main.bundle.js';
// import p5 from 'https://cdn.skypack.dev/p5';

const sketch = (p) => {
  let num;
  p.setup = () => {
    num = 0;
    p.createCanvas(400, 400);
  };
  p.draw = () => {
    num += 1;
    p.background(220);
    p.ellipse(50, num, 80, 80);
  };
};

console.log(p5);
new p5(sketch);
// console.log('hoge');
