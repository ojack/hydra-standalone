class Clock {
  constructor({
    startAt = 0, 
    countBy = 1,
    countWith = null,
    interval = 1000, 
    onTick = () => {}
  } = {}) { 
    this.currentVal = startAt
    this.countBy = countBy
    this.countWith = countWith 
      ? countWith 
      : last => last + countBy
    this.interval = interval
    this.onTick = onTick
    this.counter = this.makeClock(interval, this.countWith)
    this.val = () => this.currentVal
  }
  
  makeClock(interval, countWith = this.countWith) {
    return setInterval(
      () => {
        this.currentVal = countWith(this.currentVal)
        this.onTick(this.currentVal)
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
}


module.exports = Clock