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
  return moment()
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
  // subtract 1hr from sunriseHour and add 1hr to sunsetHour to compensate for minutes
  // since moment will format 7:23 as 7 and 17:27 as 17
  const type = hour >= sunriseHour - 1 && hour <= sunsetHour ? 'day' : 'night'
  // to show sunrise weather background 1hr before and during the sunrise hour
  const dawn = hour === sunriseHour - 1 || hour === sunriseHour
  // to show sunset weather background 1hr before and during the sunset hour
  const dusk = hour === sunsetHour - 1 || hour === sunsetHour

  if (icon) {
    switch (icon) {
      case 'clear-day':
        return dusk ? 'dusk' : dawn ? 'dawn' : 'clear-day'
      case 'clear-night':
        return dusk ? 'dusk' : dawn ? 'dawn' : 'clear-night'
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
        return 'clear-day'
    }
  }
  return 'clear-day'
}

export default getWeatherBackground
