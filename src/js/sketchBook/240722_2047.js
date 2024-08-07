import './p5Setup.js';
import './modules/p5Sound.bundle.js';

const sketch = (p) => {
  let cnvs, w, h;
  let t;
  let osc;
  let isPlaying = false;

  p.setup = () => {
    // put setup code here

    t = 0;
    cnvs = p.createCanvas(p.windowWidth, p.windowHeight);
    osc = new p5.Oscillator('sine');
    osc.freq(1000);
    cnvs.mousePressed(p.play);
    //console.log(p);

    reset();
  };

  const reset = () => {
    w = p.width;
    h = p.height;
    p.background(0);
    p.colorMode(p.HSB);

    const yn = h / 16;
    const xn = w / 16;
    const maxDist = p.dist(0, 0, w / 2, h / 2);

    for (let y = 0; y < yn; y++) {
      for (let x = 0; x < xn; x++) {
        const tx = (w / (xn - 1)) * x;
        const ty = (h / (yn - 1)) * y;

        const d = p.dist(tx, ty, w / 2, h / 2);
        const hue = p.map(d, 0, maxDist, 0, 360);

        p.fill(hue, 255, 255);
        p.circle(tx, ty, 10);
      }
    }
    //p.noLoop();
  };

  p.draw = () => {
    if (isPlaying) osc.freq(p.random(400), 1);
    // put drawing code here
    t++;
    //const sinVal = p.sin(t);
    //osc.freq(osc.freq + sinVal * 10);
  };

  p.play = () => {
    isPlaying = true;
    osc.start();
  };

  p.windowResized = () => {
    cnvs = p.resizeCanvas(p.windowWidth, p.windowHeight);
    reset();
  };
};

document.addEventListener('DOMContentLoaded', () => {
  const myp5 = new p5(sketch, 'p5Canvas');
  document
    .querySelector('#p5Canvas')
    .addEventListener('touchmove', (e) => e.preventDefault(), {
      passive: false,
    });
});
