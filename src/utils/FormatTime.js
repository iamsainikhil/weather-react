import moment from 'moment-timezone'

/**
 * @param {Number} timestamp
 * @param {String} timezone
 * @param {String} formatType (moment format types)
 */
const FormatTime = (timestamp, timezone, formatType) => {
  return moment.tz(timestamp * 1000, timezone).format(formatType)
}

export default FormatTime
