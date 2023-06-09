// import p5 from 'https://cdn.skypack.dev/p5';
import './p5Setup.js';
import './modules/p5Sound.bundle.js';

const sketch = (p) => {
  let cnvs;
  let w = p.windowWidth;
  let h = p.windowHeight;
  let r, x;

  function drawCircle() {
    //console.log(2);
    p.clear();
    p.circle(x, p.height / 2, r * 2);
  }

  function ppp() {
    x += 10;
    drawCircle();
  }

  const play = () => {
    x += 10;
    drawCircle();
  };

  p.setup = () => {
    // put setup code here
    cnvs = p.createCanvas(w, h);
    r = p.min(p.width, p.height) / 6;
    x = r;
    drawCircle();
    // cnvs.mousePressed(p.play);
    // cnvs.mouseClicked(play);
    cnvs.mouseClicked(ppp);
  };

  p.draw = () => {
    // put drawing code here
  };
};

const myp5 = new p5(sketch, 'p5Canvas');
