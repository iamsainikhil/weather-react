import moment from 'moment-timezone'

/**
 * format time into an hour
 * @param {String} type (sunrise | sunset | hour)
 * @param {Number} time (sunriseTime, sunsetTime, 0 in case of hour)
 * @param {String} timezone (ex- Pacific/Auckland)
 */
const getHour = (type, time, timezone) => {
  if (type === 'sunrise' || type === 'sunset') {
    return moment(time * 1000)
      .tz(timezone)
      .format('H')
  }
  moment()
    .tz(timezone)
    .format('H')
}

/**
 * @param {Object} data (weatherCurrent)
 * @param {String} icon (ex- cloudy)
 * @param {String} timezone (ex- Pacific/Auckland)
 */
const getWeatherBackground = data => {
  const {icon, timezone, sunrise, sunset} = data
  // format sunrise and sunset in weatherCurrent of data into an hour
  const sunriseHour = getHour('sunrise', sunrise, timezone)
  const sunsetHour = getHour('sunset', sunset, timezone)
  const hour = getHour('hour', 0, timezone)
  const type = hour >= sunriseHour && hour <= sunsetHour ? 'day' : 'night'
  // to show sunrise weather background 1hr before the sunrise
  const dawn = hour === sunriseHour - 1
  // to show sunset weather background 1hr before the sunset
  const dusk = hour === sunsetHour - 1

  if (icon) {
    switch (icon) {
      case 'clear-day':
        return dusk ? 'dusk' : dawn ? 'dawn' : 'clear-day'
      case 'clear-night':
        return 'clear-night'
      case 'rain':
        return `overcast-${type}`
      case 'snow':
        return `overcast-${type}`
      case 'sleet':
        return `overcast-${type}`
      case 'wind':
        return `cloudy-${type}`
      case 'fog':
        return `overcast-${type}`
      case 'cloudy':
        return `cloudy-${type}`
      case 'partly-cloudy-day':
        return 'cloudy-day'
      case 'partly-cloudy-night':
        return 'cloudy-night'
      case 'hail':
        return `overcast-${type}`
      case 'thunderstorm':
        return 'thunderstorm'
      case 'tornado':
        return 'tornado'
      default:
        return `clear-${type}`
    }
  }
  return `clear-${type}`
}

export default getWeatherBackground
