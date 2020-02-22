/**
 * @param {String} t
 */
const FormatTime = t => {
  // check if the 't' is sunrise/set time or timeframe time
  // 06:00 or 600 exception being 0 & 1000
  if (t === '0') return '0:00'
  else if (t === '1000') return '10:00'
  return t.includes(':') ? t : `${t.split('0')[0]}:00`
}

export default FormatTime
