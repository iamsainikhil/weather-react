import React, {useState, useEffect, useContext, Fragment} from 'react'
import {ThemeContext} from '../../context/ThemeContext'
import {AddressContext} from '../../context/AddressContext'
import FetchWeatherData from '../../utils/FetchWeatherData'
import WeatherForecastContainer from '../weather-forecast/WeatherForecastContainer'
import LoaderComponent from '../../components/loader/LoaderComponent'
import ErrorComponent from '../../components/error/ErrorComponent'
import isValid from '../../utils/ValidityChecker'
import {isNil} from 'lodash-es'

const WeatherContainer = () => {
  const {theme, colorTheme} = useContext(ThemeContext)
  const addressContext = useContext(AddressContext)
  const [weatherForecast, setWeatherForecast] = useState({})
  const [weatherCurrent, setWeatherCurrent] = useState({})
  const [alerts, setAlerts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  // check whether to show/hide weatherForecastContainer based on weatherCurrent
  const showWeatherForecast = () => {
    return isValid(weatherCurrent)
  }

  // check whether the cityName is valid
  const validCityName = () => {
    if (isValid(addressContext.address)) {
      const cityName = addressContext.address.cityName
      return (
        isValid(cityName) &&
        !cityName.includes('undefined') &&
        !cityName.includes('null')
      )
    }
    return false
  }

  const setWeatherData = (current, forecast, alerts) => {
    if (isValid(current) && isValid(forecast)) {
      setWeatherCurrent(current)
      setWeatherForecast(forecast)
      setAlerts(alerts)
    }
  }

  const fetchWeatherData = async (sample = false) => {
    try {
      setIsLoading(true)
      const {weatherCurrent, weatherForecast, alerts, error} =
        await FetchWeatherData(addressContext, sample)
      // set the weatherCurrent and weatherForecast only when the data is non-empty
      // this way, the old fetched data can be preserved when api call fail or limit exceed
      if (isNil(error)) {
        setWeatherData(weatherCurrent, weatherForecast, alerts)
        // set the error to false state with the above successful weather data fetch
        setIsError(false)
      } else {
        setIsError(true)
      }
    } catch (err) {
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  // show the loading state when fetching address information using lat & long from addressContext
  useEffect(() => {
    setIsLoading(addressContext.showLoader)
  }, [addressContext.showLoader])

  useEffect(() => {
    if (isValid(addressContext.latlong)) {
      fetchWeatherData()
    } else {
      setIsError(true)
    }
    // fetch weather data every 60 minutes
    const timer = setInterval(() => {
      fetchWeatherData()
    }, 3600000)

    return () => {
      clearInterval(timer)
    }
    // eslint-disable-next-line
  }, [addressContext.latlong])

  return (
    <Fragment>
      {isLoading ? (
        <LoaderComponent
          loaderText={
            validCityName()
              ? `Fetching weather forecast for ${addressContext.address.cityName} 😎`
              : 'Fetching address information using your geolocation coordinates'
          }
        />
      ) : (
        <Fragment>
          {isError ? (
            <div className='flex justify-center'>
              <div className='sm:w-full lg:w-2/3 xl:w-1/2'>
                <ErrorComponent
                  errorMessage={
                    validCityName()
                      ? `Something went wrong. Failed to fetch weather forecast for ${addressContext.address.cityName}! 😢`
                      : `${
                          addressContext.error ||
                          'Something went wrong. Please try again!'
                        }`
                  }
                />
                <div className='text-center py-5'>
                  <p>
                    <button
                      className={`bg-${colorTheme} text-${theme} font-semibold py-3 px-6 rounded-full capitalize`}
                      onClick={() => fetchWeatherData(true)}>
                      Show Sample Weather Information
                    </button>
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <Fragment>
              {showWeatherForecast() ? (
                <WeatherForecastContainer
                  weatherCurrent={weatherCurrent}
                  weatherForecast={weatherForecast}
                  alerts={alerts}
                  address={addressContext.address}
                  latlong={addressContext.latlong}
                />
              ) : null}
            </Fragment>
          )}
        </Fragment>
      )}
    </Fragment>
  )
}

export default WeatherContainer
