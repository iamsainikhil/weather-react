import React, {useState, useContext, useEffect, useRef, Fragment} from 'react'
import {AddressContext} from '../../context/AddressContext'
import CurrentWeatherContainer from '../current-weather/CurrentWeatherContainer'
import ForecastContainer from '../forecast/ForecastContainer'
import FetchWeatherData from './../../utils/FetchWeatherData'
import LoaderComponent from '../../components/loader/LoaderComponent'
import {sortBy} from 'lodash-es'
import Carousel from 'nuka-carousel'
import CarouselSettings from '../../utils/CarouselSettings'
import FormattedDateTime from './../../utils/FormattedDateTime'
import {ThemeContext} from '../../context/ThemeContext'

const FavoritesContainer = () => {
  const {favorites, updateFavorites} = useContext(AddressContext)
  const {theme, colorTheme} = useContext(ThemeContext)
  const [selectedFavorite, setSelectedFavorite] = useState({})
  const [favoriteWeather, setFavoriteWeather] = useState({})
  const [slideIndex, setSlideIndex] = useState(0)
  const [formattedDateTime, setFormattedDateTime] = useState('')
  const weatherRef = useRef(null)

  // scroll to weather component when selectedFavorite is set
  const scrollToRef = ref => window.scrollTo(0, ref.current.offsetTop)

  const selectFavoriteHandler = async index => {
    if (favorites[index]) {
      setSelectedFavorite({...favorites[index]})
      const formattedString = await FormattedDateTime(favorites[index].latlong)
      setFormattedDateTime(formattedString)
    }
    setSlideIndex(index)
  }

  const fetchWeatherData = () => {
    if (
      selectedFavorite !== undefined &&
      Object.keys(selectedFavorite).length
    ) {
      FetchWeatherData(selectedFavorite).then(data => {
        setFavoriteWeather(state => ({...state, ...data}))
        scrollHandler()
      })
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
    // update favorites
    const timeout = setTimeout(() => {
      if (localStorage.getItem('favorites')) {
        const fav = JSON.parse(localStorage.getItem('favorites'))
        // sort favorites by cityName
        updateFavorites({
          favorites: sortBy(fav, ['address.cityName'])
        })
      }
    }, 1000)
    return () => {
      clearInterval(timer)
      clearTimeout(timeout)
    }
    // eslint-disable-next-line
  }, [selectedFavorite])

  return (
    <Fragment>
      {favorites.length > 0 ? (
        <div className={`bg-${theme} py-10`}>
          <p className={`text-center font-bold text-2xl text-${colorTheme}`}>
            Favorites
          </p>
          {/* mobile */}
          <div className='sm:hidden px-5 py-5'>
            <Carousel
              {...CarouselSettings('favorite', theme)}
              slideIndex={slideIndex}
              afterSlide={slideIndex => selectFavoriteHandler(slideIndex)}>
              {favorites.map((favorite, index) => {
                return (
                  <div
                    className={`tracking-wide border border-${colorTheme} bg-${theme} text-${colorTheme} rounded-2xl shadow-lg cursor-pointer text-center px-6 py-6`}
                    onClick={() => {
                      selectFavoriteHandler(index)
                    }}
                    key={index}>
                    {favorite.address.cityName.split(', ')[0]}
                  </div>
                )
              })}
            </Carousel>
          </div>
          {/* tablet and above devices */}
          <div className='hidden sm:flex  justify-center items-center'>
            <div className='sm:w-5/6 xl:w-1/2 px-5 py-5'>
              <div className='flex sm:flex-row flex-wrap justify-center'>
                {favorites.map((favorite, index) => {
                  return (
                    <div
                      className={`flex sm:w-1/3 md:w-1/4 justify-center tracking-wide border border-${colorTheme} bg-${theme} text-${colorTheme} hover:bg-${colorTheme} hover:text-${theme} rounded-2xl shadow-lg cursor-pointer text-center mx-3 my-3 px-6 py-6`}
                      onClick={() => {
                        selectFavoriteHandler(index)
                      }}
                      key={index}>
                      {favorite.address.cityName.split(', ')[0]}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div ref={weatherRef}>
            {selectedFavorite.address !== undefined &&
            favoriteWeather.weatherCurrent !== undefined ? (
              <div className='flex justify-center px-5 py-10'>
                <div
                  className={`sm:w-full md:w-5/6 xl:w-1/2 border border-${colorTheme} bg-{theme} text-${colorTheme} rounded-t-2xl shadow-lg`}>
                  <CurrentWeatherContainer
                    weatherCurrent={favoriteWeather.weatherCurrent}
                    address={selectedFavorite.address}
                    latlong={selectedFavorite.latlong}
                    formattedDateTime={formattedDateTime}
                  />
                  <ForecastContainer
                    weatherForecast={favoriteWeather.weatherForecast}
                    formattedDateTime={formattedDateTime}
                  />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <LoaderComponent />
      )}
    </Fragment>
  )
}

export default FavoritesContainer
