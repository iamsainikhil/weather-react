import moment from 'moment-timezone'
import isWithinRange from './IsWithinRange'

/**
 * format timestamp to time in the form of "H:mm" where H -> 0 - 23 & mm -> 00 - 59
 * @param {String} type (sunrise | sunset | hour)
 * @param {Number} time (sunriseTime, sunsetTime, 0 in case of hour)
 * @param {String} timezone (ex- Pacific/Auckland)
 */
const formatTime = (type, time, timezone) => {
  if (type === 'sunrise' || type === 'sunset') {
    return moment(time * 1000)
      .tz(timezone)
      .format('H:mm')
  }
  return moment().tz(timezone).format('H:mm')
}

/**
 * returns day or night based on the comparison of currentTime with sunrise and sunset times
 * @param {String} currentTime
 * @param {String} sunriseTime
 * @param {String} sunsetTime
 */
const getType = (currentTime, sunriseTime, sunsetTime) => {
  const [currentHour, currentMinutes] = currentTime.split(':')
  const [sunriseHour, sunriseMinutes] = sunriseTime.split(':')
  const [sunsetHour, sunsetMinutes] = sunsetTime.split(':')
  if (currentHour === sunriseHour) {
    return Number(currentMinutes) >= Number(sunriseMinutes) ? 'day' : 'night'
  } else if (currentHour === sunsetHour) {
    return Number(currentMinutes) < Number(sunsetMinutes) ? 'day' : 'night'
  } else {
    return Number(currentHour) > Number(sunriseHour) &&
      Number(currentHour) < Number(sunsetHour)
      ? 'day'
      : 'night'
  }
}

/**
 * checks if it is dawn (sunrise) or dusk (sunset)
 * @param {*} currentTime
 * @param {*} time (sunriseTime for checking dawn & sunsetTime for checking dusk)
 */
const isDawnDusk = (currentTime, time) => {
  const currentHour = currentTime.split(':')[0]
  const timeHour = time.split(':')[0]
  return (
    Number(currentHour) === Number(timeHour) - 1 ||
    Number(currentHour) === Number(timeHour)
  )
}

/**
 * @param {Object} data (weatherCurrent)
 * @param {String} icon (ex- cloudy)
 * @param {String} timezone (ex- Pacific/Auckland)
 */
const getWeatherBackground = (data) => {
  const {weather, timezone, sunrise, sunset} = data
  const {icon, id: iconId} = weather[0]

  // format sunrise and sunset in weatherCurrent of data into hour and minutes
  const sunriseTime = formatTime('sunrise', sunrise, timezone)
  const sunsetTime = formatTime('sunset', sunset, timezone)
  const currentTime = formatTime('hour', 0, timezone)

  // get the type like day or night
  const type = getType(currentTime, sunriseTime, sunsetTime)
  // check for dawn scenario before sunrise hour
  const dawn = isDawnDusk(currentTime, sunriseTime)
  // check for dusk scenario before sunset hour
  const dusk = isDawnDusk(currentTime, sunsetTime)

  if (iconId === 800) {
    return dusk
      ? 'dusk'
      : dawn
      ? 'dawn'
      : icon === '01d'
      ? 'clear-day'
      : 'clear-night'
  } else if (iconId === 781) {
    return 'tornado'
  } else if (isWithinRange(701, 804, iconId)) {
    return `cloudy-${type}`
  } else if (isWithinRange(200, 232, iconId)) {
    return 'thunderstorm'
  } else if (isWithinRange(300, 622, iconId)) {
    return `overcast-${type}`
  } else {
    return 'clear-day'
  }
}

export default getWeatherBackground
