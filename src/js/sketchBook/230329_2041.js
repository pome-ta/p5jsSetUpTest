import './p5Setup.js';
//import './modules/p5Sound.bundle.js';

const sketch = (p) => {
  let cnvs, w, h;
  let r, x, s;

  p.setup = () => {
    // put setup code here
    cnvs = p.createCanvas(p.windowWidth, p.windowHeight);
    w = p.width;
    h = p.height;
    r = p.min(w, h) / 6;
    x = r;
    s = '0';
  };

  p.draw = () => {
    // put drawing code here
    x += 10;
    x = x > p.width + r ? -r : x;

    p.clear();
    p.circle(x, p.height / 2, r * 2);

    if (p.frameCount % 30 === 0) {
      s = p.frameRate().toFixed(0);
    }
    //p.textAlign(p.CENTER, p.TOP);

    p.push();
    p.stroke('#FF0000');
    p.line(20, 0, 20, h);
    p.stroke('#00ff00');
    p.line(0, 20, w, 20);
    p.noStroke();
    p.fill(240);
    p.textAlign(p.LEFT, p.TOP);
    const t = p.text(s, 0, 0);
    //t.textAlign(p.LEFT, p.TOP);
    p.text(`${t.height}`, 48, 48);
    p.pop();
  };
};

const myp5 = new p5(sketch, 'p5Canvas');
