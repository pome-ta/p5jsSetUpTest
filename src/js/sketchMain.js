import './p5Setup.js';
//import './modules/p5Sound.bundle.js';

const sketch = (p) => {
  let cnvs, w, h;
  

  function reset() {
    w = p.width;
    h = p.height;
  }

  p.setup = () => {
    // put setup code here
    cnvs = p.createCanvas(p.windowWidth, p.windowHeight);
    reset();
    p.background(0);

    const yn = 30;
    const xn = 60;
    
    for (let y = 0; y < yn; y++) {
      for (let x = 0; x < xn; x++) {
        const tx = (w / (xn - 1)) * x;
        const ty = (h / (yn - 1)) * y;
  
        const r = p.map(tx, 0, w, 0, 255);
        const g = p.map(ty, 0, h, 0, 255);
        p.fill(r, g, 0);
        p.circle(tx, ty, 10);
      }
    }
    p.noLoop()

  };

  p.draw = () => {
    // put drawing code here
    
  };

  p.windowResized = () => {
    cnvs = p.resizeCanvas(p.windowWidth, p.windowHeight);
    reset();
  };
};

const myp5 = new p5(sketch, 'p5Canvas');

