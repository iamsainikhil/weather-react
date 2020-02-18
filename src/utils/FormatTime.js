const FormatTime = t => {
  // check if the 't' is sunrise/set time or timeframe time
  // 06:00 or 600
  // const hour = t.split(t.includes(':') ? ':' : '0')[0]
  // if (t.includes(':')) {
  //   return `${t}`
  // }
  // return `${hour}`

  return t.includes(':') ? t : t.split('0')[0]
}

export default FormatTime
