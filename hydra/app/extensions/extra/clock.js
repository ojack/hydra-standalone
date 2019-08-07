const {
  bpmToMs,
  wrapAt,
  foldAt,
  wrapBetween,
  foldBetween,
  wrapSeq,
  foldSeq
} = require('./utils')

class Clock {
  constructor({
    bpm, // if bpm is specified, then interval will not be used
    interval = 1000, // tick interval in milliseconds
    startAt = 0, 
    countBy = 1,
    countWith = null,
    onTick = [() => {}]
  } = {}) { 
    this.currentVal = startAt
    this.countBy = countBy
    this.countWith = countWith 
      ? countWith 
      : last => last + countBy
    this.interval = bpm ? bpmToMs(bpm) : interval
    this.onTick = onTick
    this.counter = this.makeClock(interval, this.countWith)

    // Clock methods as function properties: shaders may crash if passed in a method instead of a function, so this is why.
    this.val = () => this.currentVal
    this.warpAt = modulo => wrapAt(modulo, this.val())
    this.warpBetween = (bottom, top) => wrapBetween(bottom, top, this.val())
    this.warpSeq = (numberArray) => wrapSeq(numberArray, this.val())
    this.foldAt = modulo => foldAt(modulo, this.val())
    this.foldBetween = (bottom, top) => foldBetween(bottom, top, this.val())
    this.foldSeq = (numberArray) => foldSeq(numberArray, this.val())

    // first tick
    this.onTick.forEach(cb => cb(this.currentVal))
  }
  
  makeClock(interval, countWith = this.countWith) {
    return setInterval(
      () => {
        this.currentVal = countWith(this.currentVal)
        this.onTick.forEach(cb => cb(this.currentVal))
      }, 
      interval) // maybe add option for setting interval with bpm, i.e. 1 is one beat, 0.5 half a beat, etc.
  }
    
  stop() {
    clearInterval(this.counter)
  }
        
  setInterval(interval, countWith) {
    this.stop()
    this.counter = this.makeClock(interval, countWith)
  }

  reset(val) {
    this.currentVal = val || 0
  }

  addCb(cb) {// add callback
    this.onTick.push(cb)
  }

  resetCbs(cbArray = []) {
    this.onTick = cbArray
  }
}

module.exports = Clock