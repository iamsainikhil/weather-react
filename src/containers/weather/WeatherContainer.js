import React, {useState, useEffect, useContext, Fragment} from 'react'
import ForecastContainer from '../forecast/ForecastContainer'
import CurrentWeatherContainer from '../current-weather/CurrentWeatherContainer'
import {AddressContext} from '../../context/AddressContext'
import FetchWeatherData from '../../utils/FetchWeatherData'
import {ThemeContext} from '../../context/ThemeContext'
import {isUndefined, isEmpty} from 'lodash-es'
import LoaderComponent from '../../components/loader/LoaderComponent'
import ErrorComponent from '../../components/error/ErrorComponent'
import * as Sentry from '@sentry/browser'
import emitGA from '../../utils/MiscTrackEvents'
import getWeatherBackground from './../../utils/WeatherBackground'
import './WeatherStyle.scss'

const WeatherContainer = () => {
  const addressContext = useContext(AddressContext)
  const {theme, colorTheme} = useContext(ThemeContext)

  const [weatherForecast, setWeatherForecast] = useState({})
  const [weatherCurrent, setWeatherCurrent] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  const WET_TYPES = ['rain', 'snow', 'sleet', 'hail']

  // return rain or snow svg image for the above wet types
  const weatherSVG = () => {
    if (weatherCurrent.icon === 'snow') {
      return 'snow'
    }
    return 'rain'
  }

  const imageBorder = {
    borderTopLeftRadius: '1rem',
    borderTopRightRadius: '1rem'
  }

  // check whether the cityName is valid
  const validCityName = () => {
    if (
      !isEmpty(addressContext.address) &&
      !isUndefined(addressContext.address)
    ) {
      return (
        !isEmpty(addressContext.address.cityName) &&
        !isUndefined(addressContext.address.cityName)
      )
    }
    return false
  }

  const setWeatherData = (current, forecast) => {
    if (!isEmpty(current) && !isEmpty(forecast)) {
      setWeatherCurrent(current)
      setWeatherForecast(forecast)
    }
  }

  const fetchWeatherData = async () => {
    setIsLoading(true)
    await FetchWeatherData(addressContext)
      .then(response => {
        const {weatherCurrent, weatherForecast} = response
        // set the weatherCurrent and weatherForecast only when the data is non-empty
        // this way, the old fetched data can be preserved when api call fail or limit exceed
        setWeatherData(weatherCurrent, weatherForecast)
      })
      .catch(err => {
        Sentry.captureException(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    fetchWeatherData()
    const timer = setInterval(() => {
      fetchWeatherData()
    }, 3600000)

    return () => {
      clearInterval(timer)
    }
    // eslint-disable-next-line
  }, [addressContext])

  return (
    <Fragment>
      {!isUndefined(weatherCurrent) && !isEmpty(weatherCurrent) ? (
        <Fragment>
          <div
            className={
              'flex flex-col justify-center items-center lg:px-5 pt-10'
            }>
            <div
              className={`sm:w-full lg:w-5/6 xl:max-w-6xl bg-${theme} text-${colorTheme} rounded-t-2xl shadow-lg`}>
              <div className='relative'>
                <img
                  src={`./weather-backgrounds/${getWeatherBackground(
                    weatherCurrent
                  )}.jpg`}
                  alt='clear day'
                  className='w-full object-cover object-center weather-background'
                  style={imageBorder}
                />
                {/* show rain or snow svg only when weather icon exist in WET_TYPES*/}
                <div>
                  {WET_TYPES.includes(weatherCurrent.icon) && (
                    <img
                      src={`./weather-backgrounds/${weatherSVG()}.svg`}
                      alt='clear day'
                      className='w-full object-cover object-center absolute top-0 right-0 bottom-0 left-0 weather-background'
                      style={imageBorder}
                    />
                  )}
                </div>

                {/* current weather container should be on the image on mobile and small devices */}
                <div
                  className='block md:hidden absolute top-0 bottom-0 left-0 right-0 my-auto mx-auto text-light'
                  style={{background: 'rgba(0,0,0,0.2)', ...imageBorder}}>
                  <CurrentWeatherContainer
                    weatherCurrent={weatherCurrent}
                    address={addressContext.address}
                    latlong={addressContext.latlong}
                    urbanArea={addressContext.urbanArea}
                  />
                </div>

                {/* current weather and forecast container should be on the image from medium devices */}
                <div
                  className='hidden md:block absolute top-0 bottom-0 left-0 right-0 my-auto mx-auto text-light'
                  style={{background: 'rgba(0,0,0,0.2)', ...imageBorder}}>
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

              <div className='block md:hidden'>
                <ForecastContainer
                  cityName={addressContext.address.cityName}
                  weatherCurrent={weatherCurrent}
                  weatherForecast={weatherForecast}
                />
              </div>
            </div>
          </div>

          <div className='relative'>
            <p
              className={`mx-auto text-center pt-2 pb-10 text-xs font-light text-${colorTheme} bg-${theme}`}>
              Powered by&nbsp;
              <a
                href='https://darksky.net/poweredby/'
                target='_blank'
                rel='noreferrer noopener'
                className={`link z-0 font-medium hover:text-${theme}`}
                onClick={() => emitGA('powered-by', 'Dark Sky')}>
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
                      className='hover:no-underline'
                      onClick={() =>
                        emitGA('explore-life', addressContext.urbanArea.name)
                      }>
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
                      className={`link z-0 font-medium hover:text-${theme}`}
                      onClick={() => emitGA('powered-by', 'Teleport')}>
                      Teleport
                    </a>
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          {isLoading ? (
            <LoaderComponent
              loaderText={`Fetching weather forecast ${
                validCityName() ? `for ${addressContext.address.cityName}` : ''
              } 😎`}
            />
          ) : (
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
          )}
        </Fragment>
      )}
    </Fragment>
  )
}

export default WeatherContainer
