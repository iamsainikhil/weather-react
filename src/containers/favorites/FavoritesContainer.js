import React, {useState, useContext, useEffect, useRef, Fragment} from 'react'
import {AddressContext} from '../../context/AddressContext'
import CurrentWeatherContainer from '../current-weather/CurrentWeatherContainer'
import ForecastContainer from '../forecast/ForecastContainer'
import FetchWeatherData from './../../utils/FetchWeatherData'
import {isUndefined, isEmpty} from 'lodash-es'
import Carousel from 'nuka-carousel'
import CarouselSettings from '../../utils/CarouselSettings'
import {ThemeContext} from '../../context/ThemeContext'
import FavoriteComponent from '../../components/favorite/FavoriteComponent'
import LoaderComponent from '../../components/loader/LoaderComponent'
import ErrorComponent from '../../components/error/ErrorComponent'
import * as Sentry from '@sentry/browser'
import emitGA from '../../utils/MiscTrackEvents'

const FavoritesContainer = () => {
  const {favorites} = useContext(AddressContext)
  const {theme, colorTheme} = useContext(ThemeContext)
  const [selectedFavorite, setSelectedFavorite] = useState({})
  const [favoriteWeather, setFavoriteWeather] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [slideIndex, setSlideIndex] = useState(0)
  const weatherRef = useRef(null)

  // scroll to weather component when selectedFavorite is set
  const scrollToRef = ref => window.scrollTo(0, ref.current.offsetTop)

  // check whether the cityName is valid
  const validCityName = () => {
    if (!isEmpty(selectedFavorite) && !isUndefined(selectedFavorite)) {
      return (
        !isEmpty(selectedFavorite.address.cityName) &&
        !isUndefined(selectedFavorite.address.cityName)
      )
    }
    return false
  }

  const selectFavoriteHandler = index => {
    if (favorites[index]) {
      emitGA('favorites', favorites[index].address.cityName)
      setSelectedFavorite({...favorites[index]})
    }
    setSlideIndex(index)
  }

  const fetchWeatherData = async () => {
    if (
      !isUndefined(selectedFavorite) &&
      Object.keys(selectedFavorite).length
    ) {
      setIsLoading(true)
      await FetchWeatherData(selectedFavorite)
        .then(response => {
          // set favoriteWeather only when the data is non-empty
          if (!isEmpty(response) && !isUndefined(response)) {
            setFavoriteWeather(state => ({...state, ...response}))
            scrollHandler()
          }
        })
        .catch(err => Sentry.captureException(err))
        .finally(() => setIsLoading(false))
    }
  }

  const scrollHandler = () => {
    scrollToRef(weatherRef)
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
  }, [selectedFavorite])

  return (
    <Fragment>
      {favorites.length > 0 ? (
        <div className={`bg-${theme} pt-10 pb-24 mb-0`}>
          <p className={`text-center font-bold text-2xl text-${colorTheme}`}>
            Favorites
          </p>
          {/* mobile */}
          <div className='sm:hidden px-5 py-5'>
            <Carousel
              {...CarouselSettings('favorite')}
              slideIndex={slideIndex}
              afterSlide={slideIndex => selectFavoriteHandler(slideIndex)}>
              {favorites.map((favorite, index) => {
                return (
                  <FavoriteComponent
                    key={favorite.latlong}
                    favorite={favorite}
                    favoriteSelected={() => selectFavoriteHandler(index)}
                  />
                )
              })}
            </Carousel>
          </div>
          {/* tablet and above devices */}
          <div className='hidden sm:flex justify-center items-center'>
            <div className='sm:w-5/6 xl:max-w-6xl px-5 py-5'>
              <div className='flex sm:flex-row flex-wrap justify-center'>
                {favorites.map((favorite, index) => {
                  return (
                    <div
                      className='m-2 sm:w-1/2 md:w-1/4'
                      key={favorite.latlong}>
                      <FavoriteComponent
                        key={favorite.latlong}
                        favorite={favorite}
                        favoriteSelected={() => selectFavoriteHandler(index)}
                      />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* 
            TODO: utilize weather container here instead of code repeat
          */}
          <div ref={weatherRef}>
            {!isEmpty(favoriteWeather.weatherCurrent) &&
            !isUndefined(favoriteWeather.weatherCurrent) ? (
              <Fragment>
                <div className='flex justify-center px-5 pt-10'>
                  <div
                    className={`sm:w-full lg:w-5/6 xl:max-w-6xl border border-${colorTheme} bg-{theme} text-${colorTheme} rounded-t-2xl shadow-lg`}>
                    <CurrentWeatherContainer
                      weatherCurrent={favoriteWeather.weatherCurrent}
                      address={selectedFavorite.address}
                      latlong={selectedFavorite.latlong}
                      urbanArea={selectedFavorite.urbanArea}
                    />
                    <ForecastContainer
                      cityName={selectedFavorite.address.cityName}
                      weatherCurrent={favoriteWeather.weatherCurrent}
                      weatherForecast={favoriteWeather.weatherForecast}
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
                    className={`link z-0 font-medium hover:text-${theme}`}
                    onClick={() => emitGA('powered-by', 'Dark Sky')}>
                    Dark Sky
                  </a>
                </p>
                <div className={`bg-${theme}`}>
                  {selectedFavorite.urbanArea.slug ? (
                    <div className='mx-auto text-center pb-5'>
                      <p>
                        <a
                          href={`https://teleport.org/cities/${selectedFavorite.urbanArea.slug}`}
                          target='_blank'
                          rel='noreferrer noopener'
                          className='hover:no-underline'
                          onClick={() =>
                            emitGA(
                              'explore-life',
                              selectedFavorite.urbanArea.name
                            )
                          }>
                          <button
                            className={`bg-${colorTheme} text-${theme} font-semibold py-3 px-6 rounded-full capitalize`}>
                            Explore life in {selectedFavorite.urbanArea.name}
                          </button>
                        </a>
                      </p>
                      <p
                        className={`py-1 text-xs font-light text-${colorTheme}`}>
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
              </Fragment>
            ) : (
              <Fragment>
                {isLoading ? (
                  <LoaderComponent
                    loaderText={`Fetching weather forecast ${
                      validCityName()
                        ? `for ${selectedFavorite.address.cityName}`
                        : ''
                    } 😎`}
                  />
                ) : (
                  <div>
                    {validCityName() ? (
                      // show error component only when selectedFavorite cityName is valid
                      // since by default on component load, selectedFavorite is empty
                      // this extra check will hide error and show only when api call fetch fail for selectedFavorite
                      <div className='flex justify-center'>
                        <div className='sm:w-full lg:w-2/3 xl:w-1/2'>
                          <ErrorComponent
                            errorMessage={`Something went wrong. Failed to fetch weather forecast ${
                              validCityName()
                                ? `for ${selectedFavorite.address.cityName}`
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
          </div>
        </div>
      ) : null}
    </Fragment>
  )
}

export default FavoritesContainer
