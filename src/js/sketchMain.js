import './p5Setup.js';
import './modules/p5Sound.bundle.js';

const sketch = (p) => {
  let cnvs, w, h;
  let tc;  // touchCanvas
  let bgColor;
  let suspendBgColor = '#ffff00';
  let runningBgColor = 220;
  let fft;

  let noise, env, analyzer;

  p.setup = () => {
    // put setup code here
    sizeReset();
    // ref: [userStartAudio](https://p5js.org/reference/p5/userStartAudio/)
    // ref: [getAudioContext](https://p5js.org/reference/p5/getAudioContext/)
    // mimics the autoplay policy
    //p.getAudioContext().suspend();
    //p.background(suspendBgColor);
    
    noise = new p5.Oscillator('sine');
    noise.freq(440);
    noise.amp(0.5);
    //noise.start();

    //noise = new p5.Noise();
    env = new p5.Envelope();
    env.setADSR(0.001, 0.7, 0.2, 0.5);
    env.setRange(0.5, 0);

    //cnvs?.mousePressed(p.userStartAudio);
    cnvs?.mousePressed(togglePlay);
    //cnvs?.mousePressed(noise.start);
    //console.log(p)

    //console.log(p.getAudioContext())
    //console.log(p.getAudioContext());
    
    fft = new p5.FFT();
    //p.noLoop();
  };

  p.draw = () => {
    // put drawing code here
    p.background(220);
    soundVisualize();
  };

  p.windowResized = () => {
    sizeReset();
  };
  
  
  function togglePlay() {
    noise.stop();
    noise.start();
    //env.play(noise);
    
  }
  

  function soundVisualize() {
    const spectrum = fft.analyze();
    spectrum.forEach((v, i) => {
      const x = p.map(i, 0, spectrum.length, 0, w);
      const y = -h + p.map(v, 0, 255, h, 0);
      p.rect(x, h, w / spectrum.length, y);
      //p.rect(x * 16, h, w / spectrum.length, y);
    });

    const waveform = fft.waveform();
    p.noFill();
    p.beginShape();
    p.stroke(16);
    waveform.forEach((v, i) => {
      const x = p.map(i, 0, waveform.length, 0, w);
      const y = p.map(v, -1, 1, 0, h);
      p.vertex(x, y);
    });
    p.endShape();
  }
  

  function windowSizeUpDate() {
    const sizeRatio = 0.92;
    w = p.windowWidth * sizeRatio;
    h = p.windowHeight * sizeRatio;
    if (!cnvs) {
      cnvs = p.createCanvas(w, h);
    }
    
    tc = p.createGraphics(w, h);
    p.resizeCanvas(w, h);
    //tc.background('#ff00ff80')
    p.image(tc, 0, 0);
  }
  
  function sizeReset() {
    windowSizeUpDate();
  }

};

//console.log(document.ontouchstart)

document.addEventListener('DOMContentLoaded', () => {
  const canvasId = 'p5Canvas';
  const canvasTag = document.querySelector(`#${canvasId}`);
  
  canvasTag.addEventListener('touchmove', (e) => e.preventDefault(), {
    passive: false,
  });
  

  // --- start
  const myp5 = new p5(sketch, canvasId);
  /*
  
  //const eventName = typeof document.ontouchend !== 'undefined' ? 'touchend' : 'mouseup';
  
  const eventName = typeof document.ontouchstart !== 'undefined' ? 'touchstart' : 'mousedown';
  
  
  //ontouchstart
  //touchstart
  //mousedown
  
  function initAudioContext() {
    console.log('in')
    document.removeEventListener(eventName, initAudioContext);
    // todo: wake up AudioContext
    //myp5.userStartAudio();
    myp5.getAudioContext().resume();
  }
  
  document.addEventListener(eventName, initAudioContext);
  //console.log(document)
  */
});
