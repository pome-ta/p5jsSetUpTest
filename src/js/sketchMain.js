import './p5Setup.js';
//import './modules/p5Sound.bundle.js';

const sketch = (p) => {
  let cnvs, w, h;
  let d, s;

  p.setup = () => {
    // put setup code here
    cnvs = p.createCanvas(p.windowWidth, p.windowHeight);
    w = p.width;
    h = p.height;

    p.noStroke();
    const ww = w / 2;
    const hh = h / 2;

    // todo: guide
    p.push();
    p.stroke('#FF0000');
    p.line(ww, 0, ww, h);
    p.stroke('#00ff00');
    p.line(0, hh, w, hh);
    p.pop();

    p.push();
    
    const minSize = p.min(ww, hh)
    const margin = 4
    p.fill('#ff000080')
    const redC = p.circle(ww, hh - hh / margin/2, minSize);
    p.fill('#00ff0080')
    const greenC = p.circle(ww + ww / margin, hh + hh / margin/2, minSize);
    p.fill('#0000ff80')
    const blueC = p.circle(ww - ww / margin, hh+hh/margin/2, minSize);

    p.noLoop();
  };

  p.draw = () => {
    // put drawing code here
  };
};

const myp5 = new p5(sketch, 'p5Canvas');
