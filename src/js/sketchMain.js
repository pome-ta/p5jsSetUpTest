// import p5 from 'https://cdn.skypack.dev/p5';
import './p5Setup.js';
import './modules/p5Sound.bundle.js';

const sketch = (p) => {
  let osc;
  let _angnoise, _radiusnoise;
  let _xnoise, _ynoise;
  let _angle = -p.PI / 2;
  let _radius;
  let _strokeCol = 254;
  let _strokeChange = -1;

  p.setup = () => {
    // put setup code here
    const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
    p.smooth();
    p.background(255);
    p.frameRate(60);
    p.noFill();

    _angnoise = p.random(10);
    _radiusnoise = p.random(10);
    _xnoise = p.random(10);
    _ynoise = p.random(10);
    osc = new p5.Oscillator('sine');
    osc.amp(0.5);
    osc.freq(440);
    console.log(p.canvas);
    canvas.mousePressed(p.play);
  };
  p.draw = () => {
    // put drawing code here
    _radiusnoise += 0.005;
    _radius = p.noise(_radiusnoise) * 550 + 1;
    _angnoise += 0.005;
    _angle += p.noise(_angnoise) * 6 - 3;
    if (_angle > 360) {
      _angle -= 360;
    }
    if (_angle < 0) {
      _angle += 360;
    }
    _xnoise += 0.01;
    _ynoise += 0.01;
    const centerx = p.width / 2 + p.noise(_xnoise) * 100 - 50;
    const centery = p.height / 2 + p.noise(_ynoise) * 100 - 50;
    const rad = p.radians(_angle);
    const x1 = centerx + _radius * p.cos(rad);
    const y1 = centery + _radius * p.sin(rad);

    const opprad = rad + p.PI;
    const x2 = centerx + _radius * p.cos(opprad);
    const y2 = centery + _radius * p.sin(opprad);
    _strokeCol += _strokeChange;
    if (_strokeCol > 254) {
      _strokeChange = -1;
    }
    if (_strokeCol < 0) {
      _strokeChange = 1;
    }
    p.stroke(_strokeCol, 60);
    p.strokeWeight(1);
    p.line(x1, y1, x2, y2);
  };
  p.play = () => {
    console.log('hoge');
    osc.start();
    // osc.stop(1);
  };
};

const myp5 = new p5(sketch, 'p5Canvas');
