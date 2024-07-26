import './p5Setup.js';
import './modules/p5Sound.bundle.js';

const sketch = (p) => {
  let cnvs, w, h;
  let timeCount;
  let preTime, nowTime;
  let beat = 0.0;
  let BPM;
  let osc, envelope, fft;

  p.setup = () => {
    console.log(p.millis())

    // put setup code here
    windowSizeUpDate();
    reset();
    BPM = 120;
    timeCount = 0.0;
    beat = 0.0;

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

    fft = new p5.FFT();

    //console.log(p.millis())
    p.frameRate(30)
    console.log(`frameRate: ${p.frameRate()}`);
  };

  p.draw = () => {
    // put drawing code here
    timeCount += p.frameRate();

    // console.log(`millis: ${p.millis()}`);
    console.log(`frameRate: ${p.frameRate()}`);
    // console.log(`timeCount: ${timeCount / 60}`)

    beat = timeToBeat(p.millis() / 1000);
    // console.log(beat % 4);
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
      p.vertex(x, y);
    });
    p.endShape();
  };

  p.play = () => {
    // todo: 発信してるか確認
    p.userStartAudio();
    //osc.freq(p.random(8800), 1);
  };

  p.windowResized = () => {
    windowSizeUpDate();
    reset();
  };

  const timeToBeat = (t) => (t / 60) * BPM;

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
