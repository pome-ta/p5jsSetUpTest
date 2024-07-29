import './p5Setup.js';
import './modules/p5Sound.bundle.js';

const sketch = (p) => {
  let cnvs, w, h;
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
    p.background(suspendBgColor);

    noise = new p5.Noise();
    env = new p5.Envelope();
    env.setADSR(0.001, 0.7, 0.2, 0.5);
    env.setRange(1, 0);

    //cnvs?.mousePressed(p.userStartAudio);
    //cnvs?.mousePressed(togglePlay);
    //console.log(p)

    //console.log(p.getAudioContext())
    //console.log(p.getAudioContext());
    

    fft = new p5.FFT();
    p.touchStarted(assistDots)
    
    p.noLoop();
  };

  p.draw = () => {
    // put drawing code here
    p.background(runningBgColor);
    //soundVisualize();
  };

  p.touchStarted = () => {
    //const isRunning = p.getAudioContext().state !== 'running';

    //bgColor = isRunning ? runningBgColor : suspendBgColor;
    
    //p.background(suspendBgColor);
    /*
    for (let touch of p.touches) {
    p.circle(touch.x, touch.y, 40);
  }*/
  
    p.touches.forEach((touch) => {
      console.log(touch.x)
      p.circle(touch.x, touch.y, 40);
    });
  
  };
  

  p.windowResized = () => {
    sizeReset();
  };
  
  
  const assistDots = () => {
    p.touches.forEach((touch) => {
      console.log(touch.x)
      p.circle(touch.x, touch.y, 40);
    });
  }

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
