import React, {useState, useEffect, useContext, useRef, Fragment} from 'react'
import ForecastContainer from '../forecast/ForecastContainer'
import CurrentWeatherContainer from '../current-weather/CurrentWeatherContainer'
import {AddressContext} from '../../context/AddressContext'
import FetchWeatherData from '../../utils/FetchWeatherData'
import FormattedDateTime from './../../utils/FormattedDateTime'
import {ThemeContext} from '../../context/ThemeContext'

const WeatherContainer = () => {
  const addressContext = useContext(AddressContext)
  const {theme} = useContext(ThemeContext)
  // contrast color based on theme
  const colorTheme = theme === 'light' ? 'dark' : 'light'

  const [weatherForecast, setWeatherForecast] = useState({})
  const [weatherCurrent, setWeatherCurrent] = useState({})
  const [formattedDateTime, setFormattedDateTime] = useState('')

  const previousCityName = useRef('')

  const fetchWeatherData = async () => {
    const {weatherCurrent, weatherForecast} = await FetchWeatherData(
      addressContext
    )
    setWeatherCurrent(weatherCurrent)
    setWeatherForecast(weatherForecast)
    const formattedString = await FormattedDateTime(addressContext.latlong)
    setFormattedDateTime(formattedString)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      fetchWeatherData()
    }, 3600000)

    if (previousCityName.current !== addressContext.address.cityName) {
      fetchWeatherData()
    }
    previousCityName.current = addressContext.address.cityName
    return () => {
      clearInterval(timer)
    }
    // eslint-disable-next-line
  }, [addressContext])

  return (
    <Fragment>
      {weatherCurrent !== undefined &&
      Object.keys(weatherCurrent).length > 0 ? (
        <div className={`flex justify-center px-5 py-10 bg-${theme}`}>
          <div
            className={`sm:w-full md:w-5/6 xl:w-1/2 border border-${colorTheme} bg-${theme} text-${colorTheme} rounded-lg shadow-lg`}>
            <CurrentWeatherContainer
              weatherCurrent={weatherCurrent}
              address={addressContext.address}
              latlong={addressContext.latlong}
              formattedDateTime={formattedDateTime}
            />
            <ForecastContainer
              weatherForecast={weatherForecast}
              formattedDateTime={formattedDateTime}
            />
          </div>
        </div>
      ) : null}
    </Fragment>
  )
}

export default WeatherContainer
