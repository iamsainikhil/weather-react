const fToC = temp => {
  return Math.floor(((temp - 32) * 5) / 9)
}

const cToF = temp => {
  return Math.floor((temp * 9) / 5 + 32)
}

export default {
  fToC,
  cToF
}
