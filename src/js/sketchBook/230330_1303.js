import './p5Setup.js';
//import './modules/p5Sound.bundle.js';

const sketch = (p) => {
  let cnvs, w, h;

  p.setup = () => {
    // put setup code here
    cnvs = p.createCanvas(p.windowWidth, p.windowHeight);
    w = p.width;
    h = p.height;
    p.colorMode(p.HSB, w, 100, 100);
  };

  p.draw = () => {
    // put drawing code here
    p.fill(p.mouseX, 100, 100);
    p.circle(p.mouseX, p.mouseY, 100);
  };
};

const myp5 = new p5(sketch, 'p5Canvas');
