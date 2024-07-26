import './p5Setup.js';
import './modules/p5Sound.bundle.js';

const sketch = (p) => {
  let cnvs, w, h;
  let osc, fft;
  
  p.setup = () => {
    // put setup code here
    windowSizeUpDate();
    reset();
    
    osc = new p5.Oscillator('sine');
    osc.freq(440);
    osc.start();
    cnvs?.mousePressed(p.play);
    
    fft = new p5.FFT();
    
    
  };
  
  p.draw = () => {
    // put drawing code here
    p.background(220);
    
    const spectrum = fft.analyze();
    spectrum.forEach((v, i) => {
      const x = p.map(i, 0, spectrum.length, 0, w);
      const y = -h + p.map(v, 0, 255, h, 0);
      p.rect(x, h, w / spectrum.length, y);
    });
    
    
    const waveform = fft.waveform();
    p.noFill();
    p.beginShape();
    p.stroke(20);
    waveform.forEach((v, i) => {
      const x = p.map(i, 0, waveform.length, 0, w);
      const y = p.map(v, -1, 1, 0, h);
      p.vertex(x,y);
    });
    p.endShape();
    
    
  };

  p.play = () => {
    // todo: 発信してるか確認
    p.userStartAudio()
    osc.freq(p.random(4400), 1);
  };

  p.windowResized = () => {
    windowSizeUpDate();
    reset();
  };

  const windowSizeUpDate = () => {
  cnvs = p.createCanvas(p.windowWidth * 0.92, p.windowHeight * 0.92);
  //console.log(cnvs)
  
  }

  const reset = () => {
    w = p.width;
    h = p.height;
    
    
    //p.noLoop();
  };


};

document.addEventListener('DOMContentLoaded', () => {
  const canvasId = 'p5Canvas';
  //const myp5 = new p5(sketch, canvasId);
  new p5(sketch, canvasId);
  //console.log(myp5)
  const canvasTag = document.querySelector(`#${canvasId}`);
  canvasTag.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false, });
  //myp5.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false, });
  
  
  //console.log(canvasTag)
  
});


