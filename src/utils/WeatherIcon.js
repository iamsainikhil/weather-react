import moment from 'moment-timezone'

/**
 * @param {Object} data (weatherCurrent, Timeframe, day)
 * @param {String} icon (ex- cloudy)
 * @param {String} timezone (ex- Pacific/Auckland)
 */
const getWeatherIcon = data => {
  const {icon, timezone} = data
  const hour = moment()
    .tz(timezone)
    .format('H')
  const type = hour >= 6 && hour < 18 ? 'day' : 'night'
  if (icon) {
    switch (icon) {
      case 'clear-day':
        return 'day'
      case 'clear-night':
        return 'night'
      case 'rain':
        return `${type}-rain`
      case 'snow':
        return `${type}-snow`
      case 'sleet':
        return 'sleet'
      case 'wind':
        return `wi-${type}-windy`
      case 'fog':
        return `wi-${type}-fog`
      case 'cloudy':
        return 'cloudy'
      case 'partly-cloudy-day':
        return 'day-cloudy'
      case 'partly-cloudy-night':
        return 'night-cloudy'
      case 'hail':
        return 'hail'
      case 'thunderstorm':
        return 'thunder'
      case 'tornado':
        return 'wi-tornado'
      default:
        return 'wi-na'
    }
  }
  return 'wi-na'
}

export default getWeatherIcon
