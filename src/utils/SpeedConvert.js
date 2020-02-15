const mToK = speed => {
  return Math.floor(speed * 1.6)
}

const kToM = speed => {
  return Math.floor(speed * 0.6)
}

export default {
  mToK,
  kToM
}
