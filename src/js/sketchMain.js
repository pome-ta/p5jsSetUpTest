import './p5Setup.js';
import './modules/p5Sound.bundle.js';

const sketch = (p) => {
  let cnvs, w, h;
  
  p.setup = () => {
    // put setup code here
  cnvs = p.createCanvas(p.windowWidth, p.windowHeight);
  };

  p.draw = () => {
    // put drawing code here
  };


  p.windowResized = () => {
    windowSizeUpDate();
    reset();
  };

  

  const windowSizeUpDate = () => {
    //p.resizeCanvas(p.windowWidth * 0.92, p.windowHeight * 0.92);
    w = p.width;
    h = p.height;
  };

  const reset = () => {
  console.log()
};

document.addEventListener('DOMContentLoaded', () => {
  const canvasId = 'p5Canvas';
  //const myp5 = new p5(sketch, canvasId);
  new p5(sketch, canvasId);
  //console.log(myp5)
  const canvasTag = document.querySelector(`#${canvasId}`);
  canvasTag.addEventListener('touchmove', (e) => e.preventDefault(), {
    passive: false,
  });
  //myp5.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false, });

  //console.log(canvasTag)
});
