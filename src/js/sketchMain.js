import './p5Setup.js';
//import './modules/p5Sound.bundle.js';

const sketch = (p) => {
  let cnvs;
  let r, x, s;

  p.setup = () => {
    // put setup code here
    cnvs = p.createCanvas(p.windowWidth, p.windowHeight);
    r = p.min(p.width, p.height) / 6;
    x = r;
    s = '0';
  };

  p.draw = () => {
    // put drawing code here
    x += 10;
    x = (x > p.width + r) ? -r : x;
    
    p.clear();
    p.circle(x, p.height / 2, r * 2);
    
    if (p.frameCount % 30 === 0) {
      s = p.frameRate().toFixed(0);
    }
    p.textAlign(p.CENTER, p.TOP);
    
    p.push();
    p.noStroke();
    p.fill(240);
    
    const t = p.text(s, 24, 24);
    p.text(`${t.height}`, 48, 48)
    p.pop();
  };
};

const myp5 = new p5(sketch, 'p5Canvas');

