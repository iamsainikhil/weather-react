import React, {useState, useEffect, useContext, useRef, Fragment} from 'react'
import ForecastContainer from '../forecast/ForecastContainer'
import CurrentWeatherContainer from '../current-weather/CurrentWeatherContainer'
import {AddressContext} from '../../context/AddressContext'
import FetchWeatherData from '../../utils/FetchWeatherData'
import {ThemeContext} from '../../context/ThemeContext'
import {isUndefined, isEmpty} from 'lodash-es'
import LoaderComponent from '../../components/loader/LoaderComponent'

const WeatherContainer = () => {
  const addressContext = useContext(AddressContext)
  const {theme, colorTheme} = useContext(ThemeContext)

  const [weatherForecast, setWeatherForecast] = useState({})
  const [weatherCurrent, setWeatherCurrent] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  // store ref to latlong
  const previousLatLong = useRef('')

  const setWeatherData = (current, forecast) => {
    if (!isEmpty(current) && !isEmpty(forecast)) {
      setWeatherCurrent(current)
      setWeatherForecast(forecast)
    }
  }

  const fetchWeatherData = async () => {
    setIsLoading(true)
    const {weatherCurrent, weatherForecast} = await FetchWeatherData(
      addressContext
    )
    // set the weatherCurrent and weatherForecast only when the data is non-empty
    // this way, the old fetched data can be preserved when api call fail or limit exceed
    setWeatherData(weatherCurrent, weatherForecast)
    setIsLoading(false)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      fetchWeatherData()
    }, 3600000)

    // fetch weatherData only when latlong change
    // to avoid uneccessary api calls for the same location or on page reload
    if (previousLatLong.current !== addressContext.latlong) {
      fetchWeatherData()
    }
    previousLatLong.current = addressContext.latlong
    return () => {
      clearInterval(timer)
    }
    // eslint-disable-next-line
  }, [addressContext])

  return (
    <Fragment>
      {!isUndefined(weatherCurrent) && !isEmpty(weatherCurrent) ? (
        <Fragment>
          <div className={`flex justify-center px-5 pt-10 bg-${theme}`}>
            <div
              className={`sm:w-full lg:w-5/6 xl:w-2/3 border border-${colorTheme} bg-${theme} text-${colorTheme} rounded-t-2xl shadow-lg`}>
              <CurrentWeatherContainer
                weatherCurrent={weatherCurrent}
                address={addressContext.address}
                latlong={addressContext.latlong}
                urbanArea={addressContext.urbanArea}
              />
              <ForecastContainer
                cityName={addressContext.address.cityName}
                weatherCurrent={weatherCurrent}
                weatherForecast={weatherForecast}
              />
            </div>
          </div>
          <p
            className={`mx-auto text-center pt-2 pb-10 text-xs font-light text-${colorTheme} bg-${theme}`}>
            Powered by&nbsp;
            <a
              href='https://darksky.net/poweredby/'
              target='_blank'
              rel='noreferrer noopener'
              className={`link z-0 font-medium hover:text-${theme}`}>
              Dark Sky
            </a>
          </p>
          <div className={`bg-${theme}`}>
            {addressContext.urbanArea.slug ? (
              <div className={`mx-auto text-center pb-5`}>
                <p>
                  <a
                    href={`https://teleport.org/cities/${addressContext.urbanArea.slug}`}
                    target='_blank'
                    rel='noreferrer noopener'
                    className='hover:no-underline'>
                    <button
                      className={`bg-${colorTheme} text-${theme} font-semibold py-3 px-6 rounded-full capitalize`}>
                      Explore life in {addressContext.urbanArea.name}
                    </button>
                  </a>
                </p>
                <p className={`py-1 text-xs font-light text-${colorTheme}`}>
                  Powered by&nbsp;
                  <a
                    href='https://teleport.org/'
                    target='_blank'
                    rel='noreferrer noopener'
                    className={`link z-0 font-medium hover:text-${theme}`}>
                    Teleport
                  </a>
                </p>
              </div>
            ) : null}
          </div>
        </Fragment>
      ) : (
        <Fragment>
          {isLoading ? (
            <LoaderComponent
              loaderText={`Fetching weather forecast ${
                !isEmpty(addressContext.address.cityName)
                  ? `for ${addressContext.address.cityName}`
                  : null
              }`}
            />
          ) : null}
        </Fragment>
      )}
    </Fragment>
  )
}

export default WeatherContainer
