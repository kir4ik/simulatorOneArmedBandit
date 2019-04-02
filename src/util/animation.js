export default class Animation
{
  constructor() {
    this.collection = [];
    this.isAnimate = false;
    
    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  }
  
  start() {
    this.isAnimate = true;

    return new window.Promise((resolve, reject) => {
      this._scheduleAnimaFrame(resolve, reject);
    });
  }

  add(props = {}) {
    if (typeof props.cb !== "function") return false;
    
    props.pivotPtBezier = this._getPivotPtBezier(props.timing);
    props.start = window.performance.now();
    
    this.collection.push((timestamp) => this._stepFrame(timestamp, props));
    
    return this;
  }
  
  _animaFrame(resolve, reject, time) {
    for (let ind in this.collection) {
      this.collection.splice(0, 1)[0](time);
    }
    
    if (this.collection.length > 0) this._scheduleAnimaFrame(resolve, reject);
    else resolve(true);
  }

  _scheduleAnimaFrame(resolve, reject) {
    return window.requestAnimationFrame(this._animaFrame.bind(this, resolve, reject));
  }
  
  _stepFrame(timestamp, props = {}) {
    timestamp = timestamp || window.performance.now();
    let currentTime = timestamp - props.start;

    if (currentTime < 0) currentTime = 0;
    else if (currentTime > props.duration) currentTime = props.duration;

    let validTime = this._getPercentTime(props.duration, currentTime) / 100;
    let pointBezier = this._getPointBezier(props.pivotPtBezier, validTime);

    const currentProgression = pointBezier[1];

    props.cb(currentProgression);

    if (currentTime < props.duration) {
      this.collection.push((timestamp) => this._stepFrame(timestamp, props));
    }
  }
  
  _getPivotPtBezier(timing) {
    if (Array.isArray(timing)) return timing; // custom
    
    switch(timing) {
      case 'ease-in': return [[0, 0], [.42, 0], [1, 1], [1, 1]];
      case 'ease-out': return [[0, 0], [0, 0], [.58, 1], [1, 1]];
      case 'ease-in-out': return [[0, 0], [0, 0], [.58, 1], [1, 1]];

      default: return [[0, 0], [1, 1]]; // linear
    }
  }
  
  _getPercentTime(fullTime, currentTime) {
    return currentTime / fullTime * 100;
  }
  
  _getPointBezier(points = [], time = 0) {
    if (points.length < 2) return points;
    const interPts = []; // itermediate points

    for (let i = 1; i < points.length; i++) {
      let p1 = points[i - 1];
      let p2 = points[i];
      let percent = time * 100;

      interPts.push(this._getPointOnVecByPercent(p1, p2, percent));
    }

    return interPts.length > 1 ? this._getPointBezier(interPts, time) : interPts[0];
  }
  
  _getLenVec([ x1, y1 ], [ x2, y2 ]) {
    return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
  }
  
  _getDistanceCovered(fullDistance, percentCovered) {
    return fullDistance / 100 * percentCovered;
  }
  
  _getPointOnVecByPercent([ x1, y1 ], [ x2, y2 ], percent) {
    let lenVec = this._getLenVec([ x1, y1 ], [ x2, y2 ]);
    let distanceCovered = this._getDistanceCovered(lenVec, percent);

    let k = (distanceCovered / lenVec) || 0;

    let x = x1 + (x2 - x1) * k;
    let y = y1 + (y2 - y1) * k;

    return [ x, y ];
  }
}