// import p5 from 'https://cdn.skypack.dev/p5';
import './p5Setup.js';
//import './modules/p5Sound.bundle.js';

const sketch = (p) => {
  let w = p.windowWidth;
  let h = p.windowHeight;

  p.setup = () => {
    // put setup code here
    p.createCanvas(w, h);
    p.circle(p.width / 2, p.height / 2, 50);
  };
  p.draw = () => {
    // put drawing code here
  };
};

const myp5 = new p5(sketch, 'p5Canvas');
