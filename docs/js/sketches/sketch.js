const sketch = (p) => {
  let w = p.windowWidth;
  let h = p.windowHeight;

  let osc;
  let reverb;
  let playing = false;

  p.setup = () => {
    // put setup code here

    const cnv = p.createCanvas(w, h);
    p.background(220);
    //cnv.mousePressed(p.userStartAudio());
    //cnv.mousePressed(playSound);
    //p.userStartAudio()
    osc = new p5.Oscillator('sine');
    //osc.start();
    //console.log(p.getAudioContext())
  };

  p.draw = () => {
    // put drawing code here
  };

  soundCall = () => {
    if (!playing) {
      p.userStartAudio();
      osc.start();
      playing = true;
    }
  };

  p.touchStarted = (e) => {
    //console.log('touchStarted')
    //soundCall()
  };

  p.touchMoved = (e) => {};

  p.touchEnded = (e) => {
    //console.log('touchEnded')
    soundCall();
  };

  p.windowResized = (e) => {
    w = p.windowWidth;
    h = p.windowHeight;
    p.resizeCanvas(w, h);
  };
};

new p5(sketch);
