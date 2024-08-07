import './p5Setup.js';
import './modules/p5Sound.bundle.js';

const sketch = (p) => {
  let cnvs, w, h;
  let t;
  let osc;
  let isPlaying = false;

  p.setup = () => {
    // put setup code here
    windowSizeUpDate();

    t = 0;

    osc = new p5.Oscillator('sine');
    osc.freq(440);
    isPlaying = true;
    osc.start();
    cnvs.mousePressed(p.play);

    reset();
  };

  p.draw = () => {
    // put drawing code here
    let spectrum = p5.fft.analyze();
  };

  p.play = () => {
    isPlaying = true;
    //osc.start();
    p.userStartAudio();
  };

  p.windowResized = () => {
    windowSizeUpDate();
    reset();
  };

  const windowSizeUpDate = () => {
    cnvs = p.createCanvas(p.windowWidth * 0.92, p.windowHeight * 0.92);
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
};

document.addEventListener('DOMContentLoaded', () => {
  const myp5 = new p5(sketch, 'p5Canvas');
  /*
  document
    .querySelector('#p5Canvas')
    .addEventListener('touchmove', (e) => e.preventDefault(), {
      passive: false,
    });
    */
});
