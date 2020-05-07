import FormatTime from './FormatTime'

/**
 * @param {Object} data (weatherCurrent, Timeframe, day)
 */
const getWeatherIcon = (data) => {
  const {icon, time, timezone} = data
  const hour = FormatTime(time, timezone, 'H')
  const type = hour >= 6 && hour <= 18 ? 'day' : 'night'
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
        return `${type}-cloudy`
      case 'fog':
        return `${type}-cloudy`
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
