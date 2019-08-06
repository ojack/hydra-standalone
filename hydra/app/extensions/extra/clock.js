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
    this.counter = setInterval(
      () => {
        this.currentVal = this.countWith(this.currentVal)
        this.onTick(this.currentVal)
      }, 
      interval) // maybe add option for setting interval with bpm, i.e. 1 is one beat, 0.5 half a beat, etc.
  }

  val() {
    return this.currentVal
  }

  stop() {
    clearInterval(this.counter)
  }


  setInterval(interval, countWith) {
    this.stop()
    return new Clock({
      startAt: this.currentVal,
      countBy: this.countBy,
      countWith: countWith || this.countWith,
      interval: interval,
      onTick: this.onTick
    })
  }

  reset(val) {
    this.currentVal = val || 0
  }
}


module.exports = Clock