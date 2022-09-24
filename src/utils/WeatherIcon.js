import FormatTime from './FormatTime'
import isWithinRange from './IsWithinRange'

/**
 * @param {Object} data (weatherCurrent, Timeframe, day)
 */
const getWeatherIcon = (data) => {
  const {weather, dt, timezone} = data
  const {id: iconId} = weather[0]
  const hour = FormatTime(dt, timezone, 'H')
  const type = hour >= 6 && hour <= 18 ? 'day' : 'night'

  if (iconId === 800) {
    return `${type}`
  } else if (iconId === 781) {
    return 'wi-tornado'
  } else if (isWithinRange(200, 232, iconId)) {
    return 'thunder'
  } else if (isWithinRange(300, 321, iconId)) {
    return 'hail'
  } else if (isWithinRange(500, 531, iconId)) {
    return `${type}-rain`
  } else if (isWithinRange(611, 613, iconId)) {
    return 'sleet'
  } else if (isWithinRange(600, 622, iconId)) {
    return `${type}-snow`
  } else if (
    isWithinRange(701, 781, iconId) ||
    isWithinRange(801, 804, iconId)
  ) {
    return `${type}-cloudy`
  } else {
    return 'wi-na'
  }
}

export default getWeatherIcon
