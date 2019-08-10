const {
  range,
  bpmToMs,
  wrapAt,
  foldAt,
  wrapBetween,
  foldBetween,
  wrapSeq,
  foldSeq
} = require('./utils')

// class Clock {
//   constructor({
//     bpm, // if bpm is specified, then interval will not be used
//     interval = 1000, // tick interval in milliseconds
//     startAt = 0, 
//     countBy = 1,
//     countWith = null,
//     onTick = [() => {}]
//   } = {}) { 
//     this.dt = 0
//     this.currentVal = startAt
//     this.countBy = countBy
//     this.countWith = countWith 
//       ? countWith 
//       : last => last + countBy
//     this.interval = bpm ? bpmToMs(bpm) : interval
//     this.onTick = onTick

//     // Clock methods as function properties: shaders may crash if passed in a method instead of a function, so this is why.
//     this.val = () => this.currentVal
//     this.wrapAt = modulo => wrapAt(modulo, this.val())
//     this.warpBetween = (bottom, top) => wrapBetween(bottom, top, this.val())
//     this.warpSeq = (numberArray) => wrapSeq(numberArray, this.val())
//     this.foldAt = modulo => foldAt(modulo, this.val())
//     this.foldBetween = (bottom, top) => foldBetween(bottom, top, this.val())
//     this.foldSeq = (numberArray) => foldSeq(numberArray, this.val())
//   }

//   update(dt) {
//     this.dt = dt
//   }
// }

// module.exports = Clock


// const loop = require('raf-loop')

// loop(dt)

const opable = (fn, initialVal, ops = []) => ({

})


function makeClock() {
  let dt_ = 0
  const getVal = interval => dt_/interval
  const clock = (interval) => ({
    val: () => getVal(interval),
    wrapAt: modulo => wrapAt(modulo, getVal(interval)),
    wrapBetween: (bottom, top) =>  wrapBetween(bottom, top, getVal(interval)),
    wrapSeq: (numberArray) =>  wrapSeq(numberArray, getVal(interval)),
    foldAt: modulo =>  foldAt(modulo, getVal(interval)),
    foldBetween: (bottom, top) =>  foldBetween(bottom, top, getVal(interval)),
    foldSeq: (numberArray) =>  foldSeq(numberArray, getVal(interval)),
  })
  clock.update = dt => {dt_ = dt}
  return clock
}

module.exports = makeClock
// const osc = console.log
// const clock = makeClock()
// range(0, 20).forEach(dt => {
//   clock.update(dt)
//   osc(clock(2).wrapAt(5))
// })
