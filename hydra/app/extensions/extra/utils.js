// beats per minute to milliseconds
function bpmToMs(bpm) {
  return 60/bpm*1000 
}

function range(from, to) {
  const res = []
  for(let i = from; i<to; i++) {
    res.push(i)
  }
  return res
}

// inspired by sclang's warpAt
function wrapAt(modulo, index) {
  return index%(modulo+1)
}

function wrapBetween(bottom, top, index) {
  return wrapAt(top - bottom, index) + bottom
}

// inspired by sclang's foldAt
function foldAt(modulo, index) { 
  let res;
  res = index % modulo
  let isUp = parseInt(index / modulo) % 2 === 0
  if (isUp) {
    return res
  } else {
    return modulo - res
  }
}

function foldBetween(bottom, top, index) {
  return foldAt(top - bottom, index) + bottom
}

function wrapSeq(numberArray, index) {
  const length = numberArray.length
  return numberArray[index%(length)]
}

function foldSeq(numberArray, index) {
  const length = numberArray.length
  const index_ = foldAt(length - 1, index)
  return numberArray[index_]
}

module.exports = {
  bpmToMs,
  range,
  wrapAt,
  foldAt,
  wrapBetween,
  foldBetween,
  wrapSeq,
  foldSeq
}