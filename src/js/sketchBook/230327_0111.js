import { p5 } from './modules/p5Main.bundle.js';

const sketch = (p) => {
  p.setup = () => {
    // 設定と背景
    //console.log(document.body);
    // p.createCanvas(document.body.clientWidth, document.body.clientHeight);
    //p.createCanvas(300, 400);
    p.createCanvas(p.windowWidth, p.windowHeight);
    //console.log(p.windowWidth);
    //console.log(document.body.clientWidth);
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
  p.draw = () => {};
};

const myp5 = new p5(sketch, 'p5Canvas');

// const myp5 = new p5(sketch);

