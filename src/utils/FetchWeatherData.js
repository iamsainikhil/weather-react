import axios from 'axios'
import {isUndefined, isEmpty} from 'lodash-es'
import dayjs from 'dayjs'

const API_KEY = process.env.REACT_APP_DARKSKY_API_KEY
/**
 * @param {String} latlong
 */
const getURL = latlong => {
  return `/weather?latlong=${latlong}`
  // return 'https://api.darksy.net/forecast'
}

const FetchWeatherData = async ({latlong}) => {
  let weatherCurrent = {}
  let weatherForecast = {}

  // fetch weather data only when latlong is valid to avoid uneccessary API calls
  if (!isUndefined(latlong) && !isEmpty(latlong)) {
    try {
      const weatherData = await axios
        .get(getURL(latlong))
        .then(response => response.data)
      // replace summary of currently with miuntely summary since weatherData fetch for every hour and
      // this minutely summary is good for an hour rather than the boring currently summary
      weatherData.currently.summary = weatherData.minutely.summary
      weatherCurrent = {
        ...weatherData.currently
      }

      // group 168 hours into days as keys in timeFrames
      // group days and timeFrames into weatherForecast
      const timeFrames = {}
      // create date as the keys for timeFrame in timeFrames
      // i.e timeFrames: {'02/28/2020': [{...timeFrame},...], ...}
      weatherData.hourly.data.forEach(hour => {
        const date = dayjs(hour.time * 1000).format('MM/DD/YYYY')
        if (Object.keys(timeFrames).includes(date)) {
          timeFrames[date].push(hour)
        } else {
          timeFrames[date] = [hour]
        }
      })
      const days = {}
      // create date as the keys for the day in days
      // i.e days: {'02/28/2020': {...day}, ...}
      weatherData.daily.data.forEach(day => {
        const date = dayjs(day.time * 1000).format('MM/DD/YYYY')
        // since there will be unique day objects in days
        // just create a 'date' key with day object as value for as many days
        days[date] = day
      })

      weatherForecast = {timeFrames, days}
    } catch (error) {
      console.log(error)
    }
  }

  return {
    weatherCurrent,
    weatherForecast
  }
}

export default FetchWeatherData
