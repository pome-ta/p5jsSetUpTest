import './p5Setup.js';
//import './modules/p5Sound.bundle.js';

const sketch = (p) => {
  let cnvs, w, h;
  let d, s;

  p.setup = () => {
    // put setup code here
    cnvs = p.createCanvas(p.windowWidth, p.windowHeight / 2);
    w = p.width;
    h = p.height;

    p.noFill();
    p.stroke(255);
    const ww = w / 2;
    const hh = h / 2;

    // todo: guide
    // p.push();
    // p.stroke('#FF0000');
    // p.line(ww, 0, ww, h);
    // p.stroke('#00ff00');
    // p.line(0, hh, w, hh);
    // p.pop();

    p.push();
    p.drawingContext.setLineDash([1, 4]);
    //p.line(ww, hh - hh / 1.5, ww, hh);
    //p.line(ww - ww / 1.5, hh, ww, hh);
    p.line(ww - ww / 1.5, hh - hh / 1.5, ww, hh);
    p.pop();

    p.rect(ww - ww / 1.5, hh - hh / 1.5, w / 1.5, h / 1.5);
    // 1
    //p.strokeWeight(1.5);
    //p.stroke('#ff008b');
    //p.circle(ww, hh - hh / 1.5, 24);
    //p.circle(ww - ww / 1.5, hh, 24);

    // 2
    p.strokeWeight(1.5);
    p.stroke('#ff008b');
    //p.circle(ww, hh, w / 1.5);

    // 3
    const a = w - ww / 1.5;
    const b = h - hh / 1.5;
    const q = p.sqrt(a * a + b * b);

    p.circle(ww, hh, q);

    p.noLoop();
  };

  p.draw = () => {
    // put drawing code here
  };
};

const myp5 = new p5(sketch, 'p5Canvas');
