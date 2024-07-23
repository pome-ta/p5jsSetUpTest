import './p5Setup.js';
import './modules/p5Sound.bundle.js';

const sketch = (p) => {
  let cnvs, w, h;
  let t;
  let noise, env, analyzer;
  
  const reset = () => {
    w = p.width;
    h = p.height;
    // p.noLoop();
  };

  p.setup = () => {
    // put setup code here
    t = 0;
    cnvs = p.createCanvas(p.windowWidth, p.windowHeight);
    p.background(0);
    
    
    noise = new p5.Noise();
    // 振幅エンベロープを作成
    env = new p5.Envelope();
    // attackTime, decayTime, sustainRatio, releaseTimeを設定
    env.setADSR(0.001, 0.1, 0.2, 0.1);
    // attackLevel, releaseLevelを設定
    env.setRange(1, 0);

    // p5.Amplitudeは、setInput()メソッドで入力を指定しない場合、
    // スケッチのすべてのサウンドを分析する
    analyzer = new p5.Amplitude();
  
    cnvs.mousePressed(p.play);
    reset();
  };

  

  p.draw = () => {
    // update
    p.background(0);
    // p5.Amplitudeアナライザーからの音量測定値を得る
    let level = analyzer.getLevel();

    // levelを使って緑の矩形を描画する
    let levelHeight = p.map(level, 0, 0.4, 0, h);
    p.fill(100, 250, 100);
    p.rect(0, h, w, -levelHeight);

  };
  
  
  p.play = () => {
    noise.stop();
    noise.start();
    env.play(noise);
  };


  p.windowResized = () => {
    cnvs = p.resizeCanvas(p.windowWidth, p.windowHeight);
    reset();
  };
};

document.addEventListener('DOMContentLoaded', () => {
  const myp5 = new p5(sketch, 'p5Canvas');
  document
    .querySelector('#p5Canvas')
    .addEventListener('touchmove', (e) => e.preventDefault(), {
      passive: false,
    });
});

