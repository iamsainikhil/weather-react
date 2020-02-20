const APP_ID = process.env.REACT_APP_WEATHER_UNLOCKED_APP_ID
const APP_KEY = process.env.REACT_APP_WEATHER_UNLOCKED_APP_KEY

const getURL = (type, latlong) => {
  return `http://api.weatherunlocked.com/api/${type}/${latlong}?app_id=${APP_ID}&app_key=${APP_KEY}`
}

const FetchWeatherData = async ({latlong}) => {
  let weatherCurrent = {}
  let weatherForecast = {}

  try {
    const forecastURL = getURL('forecast', latlong)
    const forecastData = await fetch(forecastURL).then(response =>
      response.json()
    )
    const currentURL = getURL('current', latlong)
    const currentData = await fetch(currentURL).then(response =>
      response.json()
    )
    weatherForecast = {...forecastData}
    weatherCurrent = {...currentData}
  } catch (error) {
    console.log(error)
  }

  return {
    weatherCurrent,
    weatherForecast
  }
}

export default FetchWeatherData
