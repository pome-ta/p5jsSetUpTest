import './p5Setup.js';
//import './modules/p5Sound.bundle.js';

const sketch = (p) => {
  let cnvs, w, h;
  let d, s;

  function reset() {
    d = 0;
  }

  p.setup = () => {
    // put setup code here
    cnvs = p.createCanvas(p.windowWidth, p.windowHeight);
    w = p.width;
    h = p.height;
    p.noStroke();
    d = 0;
    s = 0;
  };

  p.draw = () => {
    // put drawing code here
    d++;
    if (d > p.min(w, h) / 2) {
      reset();
    }
    p.clear();

    if (p.frameCount % 30 === 0) {
      s = p.frameRate().toFixed(0);
    }
    p.circle(w / 2, h / 2, d);

    p.push();
    p.noStroke();
    p.fill(240);
    p.textAlign(p.LEFT, p.TOP);
    p.text(s, 0, 0);
    p.pop();
  };
};

const myp5 = new p5(sketch, 'p5Canvas');
