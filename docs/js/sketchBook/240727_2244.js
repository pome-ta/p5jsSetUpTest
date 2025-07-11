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

  let tSize;

  const signals = [...Array(4).keys()];
  let wrapSignalSize;

  p.setup = () => {
    // put setup code here
    windowSizeUpDate();
    reset();
    BPM = 90;

    nowTime = 0.0;
    pastTime = 0.0;
    diffTime = 0.0;

    nowBeat = 0;
    pastBeat = -1;

    stockBeat = 0.0;

    is_play = false;

    osc = new p5.Oscillator('sine');
    osc.freq(440);
    osc.amp(0.0);

    envelope = new p5.Envelope();
    // attackTime, decayTime, sustainRatio, releaseTimeを設定
    envelope.setADSR(0.001, 0.1, 0.0, 0.1);
    // attackLevel, releaseLevelを設定
    envelope.setRange(0.1, 0);
    envelope.play(osc);

    cnvs?.mousePressed(p.userStartAudio);
    cnvs?.mousePressed(p.play);

    fft = new p5.FFT();
    // p.noLoop();
  };

  p.draw = () => {
    // put drawing code here
    nowTime = p.millis();
    diffTime = pastTime === 0.0 ? 0.0 : nowTime - pastTime;
    stockBeat += timeToBeat(diffTime);
    pastTime = nowTime;

    nowBeat = Math.trunc(stockBeat % 4);

    if (nowBeat !== pastBeat) {
      if (nowBeat < 1) {
        osc.freq(880);
        envelope.play(osc);
      } else {
        osc.freq(440);
        envelope.play(osc);
      }
      pastBeat = nowBeat;
    } else {
    }
    p.background(220);

    p.textSize(tSize * 0.64);
    p.textFont('monospace');
    p.textAlign(p.CENTER, p.BOTTOM);
    p.text(`${BPM} BPM`, w / 2, h / 2 - tSize * 0.24);

    p.fill(220);

    signals.forEach((i) => {
      if (is_play) {
        if (i === nowBeat) {
          p.fill(16);
        } else {
          p.fill(220);
        }
      }
      p.circle(wrapSignalSize + tSize * i, h / 2 + tSize * 0.64, tSize * 0.5);
    });

    const spectrum = fft.analyze();
    spectrum.forEach((v, i) => {
      const x = p.map(i, 0, spectrum.length, 0, w);
      const y = -h + p.map(v, 0, 255, h, 0);
      // p.rect(x, h, w / spectrum.length, y);
      p.rect(x * 16, h, w / spectrum.length, y);
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

  p.play = () => {
    // p.userStartAudio();
    is_play = !is_play;
    console.log(`play: ${is_play}`);
    if (is_play) {
      pastTime = 0.0;
      diffTime = 0.0;
      stockBeat = 0.0;
      pastBeat = -1;
      osc.start();
    } else {
      osc.stop();
    }
  };

  p.windowResized = () => {
    windowSizeUpDate();
    reset();
  };

  const timeToBeat = (t) => (t / 1000 / 60) * BPM;

  const metronom = () => {};

  const windowSizeUpDate = () => {
    cnvs = p.createCanvas(p.windowWidth * 0.92, p.windowHeight * 0.92);
  };

  const reset = () => {
    w = p.width;
    h = p.height;
    tSize = Math.min(w, h) / 8;
    wrapSignalSize = (w - tSize * signals.length) / 2 + tSize / 2;
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
