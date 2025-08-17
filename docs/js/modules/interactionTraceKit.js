class PointerTracker {
  #p;

  constructor(mainInstance) {
    this.#p = mainInstance;

    this.x = null;
    this.y = null;

    [this.click, this.start, this.move, this.end, this.isTouchDevice] =
      window.matchMedia('(hover: none)').matches
        ? ['click', 'touchstart', 'touchmove', 'touchend', true]
        : ['click', 'mousedown', 'mousemove', 'mouseup', false];
  }

  updateXY() {
    this.isTouchDevice ? this.#touchUpdate() : this.#mouseUpdate();
  }

  #touchUpdate() {
    // xxx: 最初の指だけなら`[0]`、マルチなら座標並列
    for (let touch of this.#p.touches) {
      this.x = 0 <= touch.x && touch.x <= this.#p.width ? touch.x : null;
      this.y = 0 <= touch.y && touch.y <= this.#p.height ? touch.y : null;
    }
  }

  #mouseUpdate() {
    if (!this.#p.mouseIsPressed) {
      this.x = null;
      this.y = null;
      return;
    }
    this.x =
      0 <= this.#p.mouseX && this.#p.mouseX <= this.#p.width
        ? this.#p.mouseX
        : null;
    this.y =
      0 <= this.#p.mouseY && this.#p.mouseY <= this.#p.height
        ? this.#p.mouseY
        : null;
  }
}

class TapIndicator {
  #p;
  #pg;
  #pointerTracker;
  #markSize;
  #pgColor;

  baseColorHSB = [0.0, 0.0, 1.0];

  constructor(mainInstance, markSize = 48) {
    this.#p = mainInstance;
    this.#pg = null;
    this.#pointerTracker = new PointerTracker(mainInstance);
    this.#markSize = markSize;

    this.isTapped = null;
  }

  setup() {
    this.isTapped = false;

    this.#initCreateGraphics();
    this.#setUseHooks();
  }

  #initCreateGraphics = () => {
    this.#pg && this.#pg.remove();
    this.#pg = this.#p.createGraphics(this.#p.width, this.#p.height);

    this.#pg.colorMode(this.#pg.HSB, 1.0, 1.0, 1.0, 1.0);
    this.#pgColor = this.#pg.color(...this.baseColorHSB);
    this.#pgColor.setAlpha(0.5);
    this.#pg.fill(this.#pgColor);
    this.#pg.noStroke();

    this.#pg.ellipseMode(this.#pg.CENTER);
  };

  #showMark = () => {
    this.#pg.circle(
      this.#pointerTracker.x,
      this.#pointerTracker.y,
      this.#markSize
    );
    this.#p.image(this.#pg, 0, 0);
  };

  #drawHook = () => {
    this.#pg.clear();
    if (
      !this.isTapped ||
      this.#pointerTracker.x === null ||
      this.#pointerTracker.y === null
    ) {
      return;
    }
    this.#showMark();
  };

  #touchStartedHook = (e) => {
    this.isTapped = true;
    this.#pointerTracker.updateXY();
  };
  #touchMovedHook = (e) => {
    this.#pointerTracker.updateXY();
  };
  #touchEndedHook = (e) => {
    this.isTapped = false;
    // xxx: `ended` 判定で`null` が取れるが必要か?
    this.#pointerTracker.updateXY();
  };

  #setUseHooks = () => {
    this.#useDraw();
    this.#useTouchEvents();
    this.#useWindowResized();
  };

  #useDraw() {
    const instance = this;
    const originalFunction = instance.#p.draw;

    instance.#p.draw = function (...args) {
      const result = originalFunction.apply(this, args);
      instance.#drawHook();
      return result;
    };
  }

  #useTouchEvents() {
    const instance = this;

    // touchStarted
    const touchStartedFunction =
      instance.#p.touchStarted === void 0
        ? (e) => {}
        : instance.#p.touchStarted;
    instance.#p.touchStarted = function (...args) {
      const result = touchStartedFunction.apply(this, args);
      instance.#touchStartedHook(args);
      return result;
    };

    // touchMoved
    const touchMovedFunction =
      instance.#p.touchMoved === void 0 ? (e) => {} : instance.#p.touchMoved;
    instance.#p.touchMoved = function (...args) {
      const result = touchMovedFunction.apply(this, args);
      instance.#touchMovedHook(args);
      return result;
    };

    // touchEnded
    const touchEndedFunction =
      instance.#p.touchEnded === void 0 ? (e) => {} : instance.#p.touchEnded;
    instance.#p.touchEnded = function (...args) {
      const result = touchEndedFunction.apply(this, args);
      instance.#touchEndedHook(args);
      return result;
    };
  }

  #useWindowResized() {
    const instance = this;
    const originalFunction =
      instance.#p.windowResized === void 0
        ? (e) => {}
        : instance.#p.windowResized;
    instance.#p.windowResized = function (...args) {
      const result = originalFunction.apply(this, args);
      instance.#initCreateGraphics();
      return result;
    };
  }
}

export { PointerTracker, TapIndicator, };

