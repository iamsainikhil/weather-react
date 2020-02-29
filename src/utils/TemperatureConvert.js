const fToC = temp => {
  return Math.round(((temp - 32) * 5) / 9)
}

const cToF = temp => {
  return Math.round((temp * 9) / 5 + 32)
}

export {fToC, cToF}
