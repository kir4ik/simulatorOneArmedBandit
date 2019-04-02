export default class Drum {
    constructor({ ctx, x, y, w, h, values = [] } = {}) {
      this.x = x; this.w = w;
      this.y = y; this.h = h;
      this.ctx = ctx;
      this.isVictory = false;
      
      this._values = values;
      this._seekValue = 0;
      this._valueOffsetY = 0;
      this._currentDeg = 0;
      this._degFromOneValue = 360 / this._values.length;
    }
    
    get currentValue() {
      return this._values[this._seekValue];
    }
    get nextValue() {
      if (this._seekValue + 1 >= this._values.length) return this._values[0];
      
      return this._values[this._seekValue + 1];
    }
    
    setting(opts = {}) {
      for (let prop in opts) {
        if (typeof this[prop] === "function" || !(prop in this)) continue;
        
        this[prop] = opts[prop];
      }
      
      return this;
    }
    
    draw() {
      this.ctx.save();
      this.ctx.rect(this.x, this.y, this.w, this.h);
      this.ctx.stroke();
      
      this.ctx.clip();
      this._drawValue();
      this.ctx.restore();
      
      return this;
    }
    
    turn(countSide) {
      if (countSide < 0) return this;
      
      this._currentDeg = 0; // test
      
      let deg = countSide * this._degFromOneValue;
      if ((this._currentDeg += deg) >= 360) {
        this._currentDeg = this._currentDeg % 360;
      }
      
      this._seekValue = ~~(this._currentDeg / this._degFromOneValue);
      this._valueOffsetY = this.h / this._degFromOneValue * this._currentDeg;
      
      if (this._currentDeg >= this._degFromOneValue) {
        this._valueOffsetY -= (this.h * this._seekValue);
      }
      
      return this;
    }
    
    _drawValue() {
      const valueOpts = {
        maxWidth: this.w,
        text: this.currentValue,
        x: this.x + this.w/2,
        y: this.y + this.h/2 + this.h*0.075 + this._valueOffsetY
      };
      
      this._showText(valueOpts);
      
      valueOpts.text = this.nextValue;
      valueOpts.y -= this.h;
      
      this._showText(valueOpts);
    }
    
    _showText({ text, x, y, maxWidth } = {}) {
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.font = `bold ${this.h}px monospace`;
      this.ctx.shadowColor="black";
      this.ctx.shadowBlur=15;
      this.ctx.lineWidth=5;
      
      this.ctx.strokeText(text, x, y, maxWidth);
      
      if (this.isVictory) {
        this.ctx.shadowBlur=0;
        this.ctx.fillStyle="white";
  
        this.ctx.fillText(text, x, y, maxWidth);
      }
    }
  }