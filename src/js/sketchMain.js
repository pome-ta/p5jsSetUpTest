import './p5Setup.js';
import './modules/p5Sound.bundle.js';

const sketch = (p) => {
  let cnvs, w, h;
  
  p.setup = () => {
    // put setup code here
    windowSizeUpDate()
    p.background(220);
    p.noLoop();
  };

  p.draw = () => {
    // put drawing code here
    p.background(220);
  };


  p.windowResized = () => {
    windowSizeUpDate();
    reset();
  };

  const windowSizeUpDate = () => {
    const sizeRatio = 0.92;
    w = p.windowWidth * sizeRatio;
    h = p.windowHeight * sizeRatio;
    if (!cnvs) {
      cnvs = p.createCanvas(w, h);
    } 
    p.resizeCanvas(w, h);
  };

  const reset = () => {}
};

document.addEventListener('DOMContentLoaded', () => {
  const canvasId = 'p5Canvas';
  const canvasTag = document.querySelector(`#${canvasId}`);
  canvasTag.addEventListener('touchmove', (e) => e.preventDefault(), {
    passive: false,
  });
  
  // --- start
  new p5(sketch, canvasId);
});
