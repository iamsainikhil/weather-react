import React, {useState, useEffect, useContext, Fragment} from 'react'
import {AddressContext} from '../../context/AddressContext'
import FetchWeatherData from '../../utils/FetchWeatherData'
import WeatherForecastContainer from '../weather-forecast/WeatherForecastContainer'
import LoaderComponent from '../../components/loader/LoaderComponent'
import ErrorComponent from '../../components/error/ErrorComponent'
import * as Sentry from '@sentry/browser'
import isValid from '../../utils/ValidityChecker'

const WeatherContainer = () => {
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

  const fetchWeatherData = async () => {
    try {
      const {weatherCurrent, weatherForecast, alerts} = await FetchWeatherData(
        addressContext
      )
      // set the weatherCurrent and weatherForecast only when the data is non-empty
      // this way, the old fetched data can be preserved when api call fail or limit exceed
      setWeatherData(weatherCurrent, weatherForecast, alerts)
      // set the error to false state with the above successful weather data fetch
      setIsError(false)
    } catch (err) {
      setIsError(true)
      Sentry.captureException(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setIsLoading(true)
    fetchWeatherData()
    // fetch weather data every 60 minutes
    const timer = setInterval(() => {
      fetchWeatherData()
    }, 3600000)

    return () => {
      clearInterval(timer)
    }
    // eslint-disable-next-line
  }, [addressContext.address])

  return (
    <Fragment>
      {isLoading ? (
        <LoaderComponent
          loaderText={`Fetching weather forecast ${
            validCityName() ? `for ${addressContext.address.cityName}` : ''
          } 😎`}
        />
      ) : (
        <Fragment>
          {isError ? (
            <div>
              {validCityName() ? (
                // show error component only when addressContext cityName is valid
                // since by default on component load, addressContext address is empty
                // this extra check will hide error and show only when api call fetch fail for fetching weatherData
                <div className='flex justify-center'>
                  <div className='sm:w-full lg:w-2/3 xl:w-1/2'>
                    <ErrorComponent
                      errorMessage={`Something went wrong. Failed to fetch weather forecast ${
                        validCityName()
                          ? `for ${addressContext.address.cityName}`
                          : ''
                      }! 😢`}
                    />
                  </div>
                </div>
              ) : null}
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
