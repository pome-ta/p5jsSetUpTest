// import p5 from 'https://cdn.skypack.dev/p5';
import './p5Setup.js';
import './modules/p5Sound.bundle.js';

const sketch = (p) => {
  let w = p.windowWidth;
  let h = p.windowHeight;

  p.setup = () => {
    // put setup code here
    const canvas = p.createCanvas(w, h);
    p.smooth();
    p.background(255);

    p.text('ここに、文字を入れる 😇', w / 2, h / 2);

    p.stroke('#FF0000');
    p.line(w / 2, 0, w / 2, h);

    p.stroke('#00ff00');
    p.line(0, h / 2, w, h / 2);
    p.noLoop();
  };
  p.draw = () => {
    // put drawing code here
  };
};

const myp5 = new p5(sketch, 'p5Canvas');
