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

    const yn = h / 8;
    const xn = w / 8;
    
    for (let y = 0; y < yn; y++) {
      for (let x = 0; x < xn; x++) {
        const tx = (w / (xn - 1)) * x;
        const ty = (h / (yn - 1)) * y;
        
        const dx = p.abs(tx - w / 2);
        const dy = p.abs(ty - h / 2);
  
        const r = p.map(dx, 0, w / 2, 0, 255);
        const b = p.map(dy, 0, h / 2, 0, 255);
        p.fill(r, 0, b);
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

