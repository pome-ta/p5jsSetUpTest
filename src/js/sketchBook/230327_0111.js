import { p5 } from './modules/p5Main.bundle.js';

const sketch = (p) => {
  p.setup = () => {
    // put setup code here
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.smooth();
    p.background(230, 230, 230);
    // 2本の交差した直線を描く
    p.stroke(130, 0, 0);
    p.strokeWeight(4);
    p.line(
      p.width / 2 - 70,
      p.height / 2 - 70,
      p.width / 2 + 70,
      p.height / 2 + 70
    );
    p.line(
      p.width / 2 + 70,
      p.height / 2 - 70,
      p.width / 2 - 70,
      p.height / 2 + 70
    );
    // 円を描く
    p.fill(255, 150);
    p.ellipse(p.width / 2, p.height / 2, 50, 50);
  };
  p.draw = () => {
    // put drawing code here
  };
};

const myp5 = new p5(sketch, 'p5Canvas');

// const myp5 = new p5(sketch);
