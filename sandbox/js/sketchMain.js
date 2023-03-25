// import * as p5 from './p5.js';
import p5 from 'https://cdn.skypack.dev/p5';

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

// new p5(sketch);
console.log(p5);
