import React, {useState, useContext, useEffect, useRef, Fragment} from 'react'
import {AddressContext} from '../../context/AddressContext'
import FetchWeatherData from './../../utils/FetchWeatherData'
import {isUndefined, isEmpty, find, isNull} from 'lodash-es'
import Carousel from 'nuka-carousel'
import CarouselSettings from '../../utils/CarouselSettings'
import {ThemeContext} from '../../context/ThemeContext'
import FavoriteComponent from '../../components/favorite/FavoriteComponent'
import WeatherForecastContainer from '../weather-forecast/WeatherForecastContainer'
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
  const [slideIndex, setSlideIndex] = useState(null)
  const weatherRef = useRef()

  // favorites data length
  const favoritesLength = useRef(0)

  /**
   * scroll to weather component when selectedFavorite is set
   * @param {DOMElement} ref (weatherRef)
   */
  const scrollToRef = ref => window.scrollTo(0, ref.current.offsetTop)

  // check whether the cityName is valid
  const validCityName = () => {
    if (
      !isEmpty(selectedFavorite) &&
      !isUndefined(selectedFavorite) &&
      !isNull(selectedFavorite)
    ) {
      const cityName = selectedFavorite.address.cityName
      return (
        !isEmpty(cityName) &&
        !isUndefined(cityName) &&
        !cityName.includes('') &&
        !cityName.includes('null')
      )
    } else {
      return false
    }
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
      try {
        setIsLoading(true)
        const response = await FetchWeatherData(selectedFavorite)
        // set favoriteWeather only when the data is non-empty
        if (!isEmpty(response) && !isUndefined(response) && !isNull(response)) {
          setFavoriteWeather(state => ({...state, ...response}))
          scrollHandler()
        }
      } catch (err) {
        Sentry.captureException(err)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const scrollHandler = () => {
    scrollToRef(weatherRef)
  }

  const favoritesChecker = () => {
    // check for deleted selectedFavorite scenario
    // i.e. selectedFavorite is not in the favorites
    // to update it with the favorite at current slideIndex
    if (
      !isEmpty(selectedFavorite) &&
      !isUndefined(selectedFavorite) &&
      !isNull(selectedFavorite)
    ) {
      if (
        isUndefined(
          find(
            favorites,
            favorite =>
              favorite.address.cityName === selectedFavorite.address.cityName
          )
        )
      ) {
        selectFavoriteHandler(slideIndex)
      } else {
        // if favorites get updated
        // i.e. a new favorite is added (favorites.length > favoritesLength)
        // set selectedFavorite and slideIndex to the newly added favorite
        // i.e. last favorite in favorites
        if (favorites.length > favoritesLength.current) {
          selectFavoriteHandler(favorites.length - 1)
        }
      }
    }
  }

  useEffect(() => {
    fetchWeatherData()
    /* important edge case scenarios checker for deleted selectedFavorite & newly added favorite */
    favoritesChecker()
    // update favoritesLength
    favoritesLength.current = favorites.length
    const timer = setInterval(() => {
      fetchWeatherData()
    }, 3600000)
    return () => {
      clearInterval(timer)
    }
    // eslint-disable-next-line
  }, [selectedFavorite, favorites])

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
                    index={index}
                    selectedIndex={slideIndex}
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
                        index={index}
                        selectedIndex={slideIndex}
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
            !isUndefined(favoriteWeather.weatherCurrent) &&
            !isNull(favoriteWeather.weatherCurrent) ? (
              <WeatherForecastContainer
                weatherCurrent={favoriteWeather.weatherCurrent}
                weatherForecast={favoriteWeather.weatherForecast}
                address={selectedFavorite.address}
                latlong={selectedFavorite.latlong}
                urbanArea={selectedFavorite.urbanArea}
              />
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
