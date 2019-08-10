console.log(range(0, 20).map(x => wrapBetween(5, 10, x)))
console.log(range(0, 20).map(x => foldBetween(5, 10, x)))
console.log(range(0, 20).map(x => wrapSeq([4, 5 ,2, 3], x)))
console.log(range(0, 20).map(x => foldSeq([4, 5 ,2, 3], x)))
