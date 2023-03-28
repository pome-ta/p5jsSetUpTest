import './p5Setup.js';
import './modules/p5Sound.bundle.js';

const sketch = (p) => {
  let cnvs;
  let r, x;

  function drawCircle() {
    p.clear();
    p.circle(x, p.height / 2, r * 2);
  }

  function addCounter() {
    x += 10;
    x = (x > p.width + r) ? -r : x;
    drawCircle();
  }

  
  p.setup = () => {
    // put setup code here
    cnvs = p.createCanvas(p.windowWidth, p.windowHeight);
    r = p.min(p.width, p.height) / 6;
    x = r;
    drawCircle();
    cnvs.mouseClicked(addCounter);
  };

  p.draw = () => {
    // put drawing code here
  };
};

const myp5 = new p5(sketch, 'p5Canvas');

