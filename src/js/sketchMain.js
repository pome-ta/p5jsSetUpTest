import './p5Setup.js';
//import './modules/p5Sound.bundle.js';

const sketch = (p) => {
  let cnvs, w, h;
  let x1, x2, x, y;

  function reset() {
    const outMargin = 32;
    x1 = outMargin;
    x2 = w - outMargin;
    // x = x1;
    y = h / 2;
  }

  p.setup = () => {
    // put setup code here
    cnvs = p.createCanvas(p.windowWidth, p.windowHeight);
    w = p.width;
    h = p.height;

    p.textAlign(p.CENTER, p.CENTER);
    reset();
    x = x1;
  };

  p.draw = () => {
    // put drawing code here
    //x++;
    x = x >= x2 ? x1 : x + 1;
    console.log(x);
    p.clear();

    p.noStroke();
    p.fill(240);
    p.text(x1, x1, y - 65);
    p.text(x2, x2, y - 65);
    p.text(x, x, y - 65);
    p.text(p.norm(x, x1, x2).toFixed(2), x, y + 65);
    p.text(0, x1, y + 65);
    p.text(1, x2, y + 65);

    p.stroke(240);
    p.noFill();
    p.line(x1, y - 45, x1, y - 25);
    p.line(x2, y - 45, x2, y - 25);
    p.line(x, y - 45, x, y - 25);
    p.line(x, y + 45, x, y + 25);
    p.line(x1, y + 45, x1, y + 25);
    p.line(x2, y + 45, x2, y + 25);

    p.stroke(240);
    p.noFill();
    p.line(x1, y, x2, y);

    p.stroke(240);
    p.fill('#292a33');
    p.circle(x, y, 20);
  };

  p.windowResized = () => {
    cnvs = p.resizeCanvas(p.windowWidth, p.windowHeight);
    w = p.width;
    h = p.height;
    reset();
  };
};

const myp5 = new p5(sketch, 'p5Canvas');
