import './p5Setup.js';
//import './modules/p5Sound.bundle.js';

const sketch = (p) => {
  let cnvs, w, h;
  let c = 0;

  p.setup = () => {
    // put setup code here
    cnvs = p.createCanvas(p.windowWidth, p.windowHeight);
    w = p.width;
    h = p.height;
    p.colorMode(p.HSB, 1.0, 1, 1);
  };

  p.draw = () => {
    // put drawing code here
    // xxx: 360 でスマートに書けそう
    c = p.abs(p.sin(p.frameCount * p.PI / 100))
    p.clear();
    p.text(c, 24, 24);
    
    p.fill(c, 1, 1);
    p.circle(w/2, h/2, p.min(w,h)/2);
  };
};

const myp5 = new p5(sketch, 'p5Canvas');

