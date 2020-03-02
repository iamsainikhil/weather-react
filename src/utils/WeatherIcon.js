import moment from 'moment-timezone'

/**
 *
 * @param {String} code (cloudy)
 * @param {String} timezone (Pacific/Auckland)
 */
const getWeatherIcon = (code, timezone) => {
  const hour = moment()
    .tz(timezone)
    .format('H')
  const type = hour >= 6 && hour < 18 ? 'day' : 'night-alt'
  if (code) {
    switch (code) {
      case 'clear-day':
        return 'day-sunny'
      case 'clear-night':
        return 'night-clear'
      case 'rain':
        return `${type}-rain`
      case 'snow':
        return `${type}-snow`
      case 'sleet':
        return `${type}-sleet`
      case 'wind':
        return `${type === 'night-alt' ? 'night-alt-cloudy' : 'day'}-windy`
      case 'fog':
        return type === 'day' ? 'day-fog' : 'night-fog'
      case 'cloudy':
        return 'cloudy'
      case 'partly-cloudy-day':
        return 'day-cloudy'
      case 'partly-cloudy-night':
        return 'night-alt-cloudy'
      case 'hail':
        return `${type}-hail`
      case 'thunderstorm':
        return `${type}-thunderstorm`
      case 'tornado':
        return 'tornado'
      default:
        return 'na'
    }
  }
  return 'na'
}

export default getWeatherIcon
