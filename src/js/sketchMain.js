import './p5Setup.js';
//import './modules/p5Sound.bundle.js';

const sketch = (p) => {
  let cnvs, w, h;
  let x1, x2, x, y;

  p.setup = () => {
    // put setup code here
    cnvs = p.createCanvas(p.windowWidth, p.windowHeight);
    w = p.width;
    h = p.height;

    p.textAlign(p.CENTER, p.CENTER);

    const outMargin = 24;
    x1 = outMargin;
    x2 = w - outMargin;
    x = x1;
    y = h / 2;
  };

  p.draw = () => {
    // put drawing code here
    //x++;
    x = x > x2 ? x1 : x + 1;
    p.clear();

    p.noStroke();
    p.fill(240);
    p.text(x1, x1, y - 65);
    p.text(x2, x2, y - 65);
    p.text(x, x, y - 65);
    p.text(p.norm(x, x1, x2).toFixed(2), x, y + 65);
    p.text(0, x1, y + 65);
    p.text(1, x2, y + 65);
  };
};

const myp5 = new p5(sketch, 'p5Canvas');
