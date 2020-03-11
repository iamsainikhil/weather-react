import React, {useState, useEffect, useContext, useRef, Fragment} from 'react'
import {AddressContext} from '../../context/AddressContext'
import {ThemeContext} from '../../context/ThemeContext'
import {imageExist, getImageDetails} from '../../utils/ImageDetails'
import {isUndefined, isEmpty} from 'lodash-es'
import moment from 'moment-timezone'
import {PropTypes} from 'prop-types'
import {Event} from '../../utils/ReactAnalytics'
import {FaRegHeart, FaHeart} from 'react-icons/fa'

const InfoComponent = ({address, latlong, urbanArea, weatherCurrent}) => {
  const {updateFavorites} = useContext(AddressContext)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')

  const {colorTheme} = useContext(ThemeContext)

  // get image details
  const {image, photographer, site, source} = getImageDetails(urbanArea)

  const imageOverlay = {
    background: 'rgba(0,0,0,0.7)',
    borderTopLeftRadius: '1rem',
    borderTopRightRadius: '1rem'
  }

  // track image source click event to GA
  const emitImageSourceGA = () => {
    Event({
      category: 'City Image',
      action: 'Click on Image Source',
      label: 'Image source'
    })
  }

  /**
   * track select favorite click event to GA
   * @param {String} type (add or remove)
   * @param {String} favoriteCity (name)
   */
  const emitFavoriteCityGA = (type, favoriteCity) => {
    Event({
      category: 'Favorite City',
      action: `${type} city`,
      label: favoriteCity
    })
  }

  // store formattedDateTime moment date object in the ref and update it for the first api call fetch
  // this ref will be used to update date and time every second without making additional api calls
  const formattedDateTimeRef = useRef()

  const isBookmarked = () => {
    if (localStorage.getItem('favorites')) {
      const favorites = JSON.parse(localStorage.getItem('favorites'))
      const matched = favorites.filter(
        favorite => favorite.address.cityName === address.cityName
      )
      return matched.length > 0
    }
    return false
  }

  const favoritesHandler = () => {
    // first ever favorite item stored in localStorage
    if (!localStorage.getItem('favorites')) {
      localStorage.setItem(
        'favorites',
        JSON.stringify([{address, latlong, urbanArea}])
      )
      emitFavoriteCityGA('add', address.cityName)
      updateFavorites({
        favorites: [{address, latlong, urbanArea}]
      })
    } else {
      const favorites = JSON.parse(localStorage.getItem('favorites'))
      const duplicates = favorites.filter(
        favorite => favorite.address.cityName === address.cityName
      )
      if (!duplicates.length) {
        // add newly added favorite to old favorites
        const updatedFavorites = [...favorites, {address, latlong, urbanArea}]
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
        emitFavoriteCityGA('add', address.cityName)
        updateFavorites({
          favorites: updatedFavorites
        })
      } else {
        // if already favorite is selected
        // remove it from favorites
        const removeIndex = favorites.findIndex(
          favorite =>
            favorite.address.cityName === duplicates[0].address.cityName
        )
        if (removeIndex !== -1) {
          const newFavorites = [...favorites]
          newFavorites.splice(removeIndex, 1)
          localStorage.setItem('favorites', JSON.stringify(newFavorites))
          emitFavoriteCityGA('remove', address.cityName)
          updateFavorites({
            favorites: newFavorites
          })
        }
      }
    }
  }

  // format and set date & time based on the dateObj
  const datetimeSetter = dateObj => {
    setDate(!isUndefined(dateObj) ? dateObj.format('MMMM Do, YYYY') : '')
    setTime(!isUndefined(dateObj) ? dateObj.format('dddd h:mm A') : '')
    formattedDateTimeRef.current = dateObj ? dateObj : null
  }

  useEffect(() => {
    // reset date & time whenever weatherCurrent change
    datetimeSetter(
      moment(weatherCurrent.time * 1000).tz(weatherCurrent.timezone)
    )

    const dateTimer = setInterval(() => {
      if (weatherCurrent.time) {
        // update date and time every second only when there is a valid timestamp
        const formattedDateTimeObj = moment
          .tz(formattedDateTimeRef.current, weatherCurrent.timezone)
          .add(1, 's')
        datetimeSetter(formattedDateTimeObj)
      }
    }, 1000)
    return () => {
      clearInterval(dateTimer)
    }
    // eslint-disable-next-line
  }, [weatherCurrent])

  return (
    <div className='relative'>
      <div>
        {imageExist(urbanArea) ? (
          <Fragment>
            <img
              src={image.mobile}
              alt='city'
              className='block sm:hidden h-40 w-full object-cover object-center rounded-t-2xl'
            />
            <img
              src={image.web}
              alt='city'
              className='hidden sm:block sm:h-32 md:h-24 xl:h-32 w-full object-cover object-center rounded-t-2xl'
            />
          </Fragment>
        ) : null}
      </div>
      <div
        className={`${
          imageExist(urbanArea)
            ? 'absolute top-0 left-0 right-0 bottom-0 text-light'
            : `text-${colorTheme}`
        }`}
        style={imageExist(urbanArea) ? imageOverlay : null}>
        <div className='flex justify-between items-start'>
          <div className='pt-4 px-4'>
            <p
              className={`font-bold ${
                imageExist(urbanArea) ? 'sm:text-2xl' : ''
              }`}>
              {address.cityName}
            </p>
            <div
              className={`sm:flex-col md:flex md:flex-row ${
                imageExist(urbanArea) ? 'font-medium' : 'font-light'
              }`}>
              {!isEmpty(date) && !isEmpty(time) ? (
                <Fragment>
                  <p>
                    {date}
                    <span className='invisible md:visible'>&nbsp;|&nbsp;</span>
                  </p>
                  <p>{time}</p>
                </Fragment>
              ) : null}
            </div>
          </div>
          <div
            className='mt-6 mr-4 cursor-pointer text-xl'
            title={
              isBookmarked()
                ? 'Remove this city from favorites'
                : 'Favorite this city'
            }
            onClick={favoritesHandler}>
            {isBookmarked() ? <FaHeart /> : <FaRegHeart />}
          </div>
        </div>
        <div className='hidden md:block text-right bottom-0 right-0 xl:mt-8 px-2'>
          {photographer && site ? (
            <p className='font-light' style={{fontSize: '0.5rem'}}>
              Photo by&nbsp;
              <span className='font-medium'>{photographer}</span>
              &nbsp;on&nbsp;
              <a
                className='link z-0 font-medium hover:no-underline hover:font-medium hover:text-light'
                href={source}
                target='_blank'
                rel='noreferrer noopener'
                onClick={emitImageSourceGA}>
                {site}
              </a>
            </p>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default InfoComponent

InfoComponent.propTypes = {
  address: PropTypes.objectOf(PropTypes.string),
  latlong: PropTypes.string,
  urbanArea: PropTypes.object,
  weatherCurrent: PropTypes.object
}
