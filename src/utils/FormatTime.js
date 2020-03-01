import moment from 'moment-timezone'

/**
 * @param {Number} timestamp
 * @param {String} timezone
 */
const FormatTime = (timestamp, timezone, formatType) => {
  return moment.tz(timestamp * 1000, timezone).format(formatType)
}

export default FormatTime
