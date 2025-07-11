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
    const overMin = p.min(w, h) / 2;
    if (d > overMin) {
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

    p.stroke('#FF0000');
    p.line(0, h / 2, w, h / 2);
    p.line(w / 2, 0, w / 2, h);
    p.stroke('#00ff00');
    p.line(0, h / 2 - overMin / 2, w, h / 2 - overMin / 2);
    p.line(0, h / 2 + overMin / 2, w, h / 2 + overMin / 2);
    p.line(w / 2 - overMin / 2, 0, w / 2 - overMin / 2, h);
    p.line(w / 2 + overMin / 2, 0, w / 2 + overMin / 2, h);

    p.pop();
  };
};

const myp5 = new p5(sketch, 'p5Canvas');
