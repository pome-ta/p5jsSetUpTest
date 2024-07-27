import './p5Setup.js';
import './modules/p5Sound.bundle.js';

const sketch = (p) => {
  let cnvs, w, h;
  let nowTime, pastTime, diffTime;
  let nowBeat, pastBeat;
  let stockBeat;
  let is_play;

  let BPM;
  let osc, envelope, fft;

  p.setup = () => {
    // put setup code here
    windowSizeUpDate();
    reset();
    BPM = 120;

    nowTime = 0.0;
    pastTime = 0.0;
    diffTime = 0.0;

    nowBeat = 0;
    pastBeat = -1;

    stockBeat = 0.0;

    is_play = false;

    osc = new p5.Oscillator('sine');
    //osc.freq(440);
    //osc.amp(0.1);
    //osc.start();

    envelope = new p5.Envelope();
    // attackTime, decayTime, sustainRatio, releaseTimeを設定
    envelope.setADSR(0.001, 0.5, 0.1, 0.5);
    // attackLevel, releaseLevelを設定
    envelope.setRange(1, 0);
    // FFTを作成

    cnvs?.mousePressed(p.userStartAudio);
    cnvs?.mousePressed(p.play);

    fft = new p5.FFT();
    // p.frameRate(16);
    // p.noLoop();
  };

  p.draw = () => {
    // put drawing code here
    nowTime = p.millis();
    diffTime = nowTime - pastTime;
    stockBeat += timeToBeat(diffTime);
    pastTime = nowTime;

    nowBeat = Math.trunc(stockBeat % 4);

    if (nowBeat !== pastBeat) {
      // console.log(nowBeat)
      if (nowBeat < 1) {
        // p.background('#ff00ff');
        p.stroke('#ff00ff');
      } else {
        // p.background(255 - 220);
        p.stroke(255 - 20);
      }
      pastBeat = nowBeat;
    } else {
      // p.background(220);
      p.stroke(20);
    }
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
    // p.stroke(20);
    waveform.forEach((v, i) => {
      const x = p.map(i, 0, waveform.length, 0, w);
      const y = p.map(v, -1, 1, 0, h);
      p.vertex(x, y);
    });
    p.endShape();
  };

  p.play = () => {
    is_play = !is_play;
    console.log(`play: ${is_play}`);
    if (is_play) {
    } else {
      nowTime = 0.0;
      pastTime = 0.0;
      diffTime = 0.0;
      stockBeat = 0.0;
    }
  };

  p.windowResized = () => {
    windowSizeUpDate();
    reset();
  };

  const timeToBeat = (t) => (t / 1000 / 60) * BPM;

  const windowSizeUpDate = () => {
    cnvs = p.createCanvas(p.windowWidth * 0.92, p.windowHeight * 0.92);
    //console.log(cnvs)
  };

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
  canvasTag.addEventListener('touchmove', (e) => e.preventDefault(), {
    passive: false,
  });
  //myp5.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false, });

  //console.log(canvasTag)
});
