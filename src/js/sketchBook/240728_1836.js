import './p5Setup.js';
import './modules/p5Sound.bundle.js';

const sketch = (p) => {
  let cnvs, w, h;
  let fft;

  let noise, env, analyzer;

  p.setup = () => {
    // put setup code here
    sizeReset();
    p.background(220);

    noise = new p5.Noise();
    env = new p5.Envelope();
    env.setADSR(0.001, 0.7, 0.2, 0.5);
    env.setRange(1, 0);

    //cnvs?.mousePressed(p.userStartAudio);
    cnvs?.mousePressed(togglePlay);
    //console.log(p)

    console.log(document);

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

  const togglePlay = () => {
    console.log('t');
    noise.stop();
    noise.start();
    env.play(noise);
  };

  const soundVisualize = () => {
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

  const sizeReset = () => {
    windowSizeUpDate();
  };
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

  //const eventName = typeof document.ontouchend !== 'undefined' ? 'touchend' : 'mouseup';

  const eventName =
    typeof document.ontouchstart !== 'undefined' ? 'touchstart' : 'mousedown';

  //ontouchstart
  //touchstart
  //mousedown

  function initAudioContext() {
    console.log('in');
    document.removeEventListener(eventName, initAudioContext);
    // todo: wake up AudioContext
    //myp5.userStartAudio();
    myp5.getAudioContext().resume();
  }

  document.addEventListener(eventName, initAudioContext);
  //console.log(document)
});
