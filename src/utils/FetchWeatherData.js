import axios from 'axios'
import {isUndefined, isEmpty} from 'lodash-es'

const APP_ID = process.env.REACT_APP_WEATHER_UNLOCKED_APP_ID
const APP_KEY = process.env.REACT_APP_WEATHER_UNLOCKED_APP_KEY
/**
 * @param {String} type (forecast | current)
 * @param {String} latlong
 */
const getURL = (type, latlong) => {
  return `http://api.weatherunlocked.com/api/${type}/${latlong}?app_id=${APP_ID}&app_key=${APP_KEY}`
}

const FetchWeatherData = async ({latlong}) => {
  let weatherCurrent = {}
  let weatherForecast = {}

  // fetch weather data only when latlong is valid to avoid uneccessary API calls
  if (!isUndefined(latlong) && !isEmpty(latlong)) {
    try {
      const forecastURL = getURL('forecast', latlong)
      const forecastData = await axios
        .get(forecastURL)
        .then(response => response.data)
      const currentURL = getURL('current', latlong)
      const currentData = await axios
        .get(currentURL)
        .then(response => response.data)
      weatherForecast = {...forecastData}
      weatherCurrent = {...currentData}
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
