import React, {useState, useEffect, useContext, useRef, Fragment} from 'react'
import {AddressContext} from '../../context/AddressContext'
import dayjs from 'dayjs'
import FormattedDateTime from '../../utils/FormattedDateTime'

const InfoComponent = ({address, latlong}) => {
  const {updateFavorites} = useContext(AddressContext)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')

  // store ref to formattedDateTime and update it for the first api call fetch
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
    if (!localStorage.getItem('favorites')) {
      localStorage.setItem('favorites', JSON.stringify([{address, latlong}]))
      updateFavorites({
        favorites: [{address, latlong}]
      })
    } else {
      const favorites = JSON.parse(localStorage.getItem('favorites'))
      const duplicates = favorites.filter(
        favorite => favorite.address.cityName === address.cityName
      )
      if (!duplicates.length) {
        localStorage.setItem(
          'favorites',
          JSON.stringify([...favorites, {address, latlong}])
        )
        updateFavorites({
          favorites: [...favorites, {address, latlong}]
        })
      } else {
        // remove it from favorites
        const removeIndex = favorites.findIndex(
          favorite =>
            favorite.address.cityName === duplicates[0].address.cityName
        )
        if (removeIndex !== -1) {
          const newFavorites = [...favorites]
          newFavorites.splice(removeIndex, 1)
          localStorage.setItem('favorites', JSON.stringify([...newFavorites]))
          updateFavorites({
            favorites: [...newFavorites]
          })
        }
      }
    }
  }

  // format and set date & time based on the dateObj
  const datetimeSetter = dateObj => {
    setDate(dateObj.format('MMMM DD, YYYY'))
    setTime(dateObj.format('dddd h:mm A'))
  }

  const fetchDateTime = async () => {
    const formattedDateTime = await FormattedDateTime(latlong)
    datetimeSetter(dayjs(formattedDateTime))
    formattedDateTimeRef.current = formattedDateTime
  }

  useEffect(() => {
    fetchDateTime()
    const dateTimer = setInterval(() => {
      // update date and time every second
      const formattedDateTimeObj = dayjs(formattedDateTimeRef.current).add(
        1,
        'second'
      )
      datetimeSetter(formattedDateTimeObj)
    }, 1000)
    return () => {
      clearInterval(dateTimer)
    }
    // eslint-disable-next-line
  }, [latlong])

  return (
    <div className='flex justify-between items-start'>
      <div className='pt-4 px-4'>
        <p className='font-bold'>{address.cityName}</p>
        <div className='sm:flex-col md:flex md:flex-row'>
          {date ? (
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
        className='mt-4 mr-4 cursor-pointer'
        title={
          isBookmarked
            ? 'Remove this city from favorites'
            : 'Favorite this city'
        }
        onClick={favoritesHandler}>
        {isBookmarked() ? <span>&#9733;</span> : <span>&#9734;</span>}
      </div>
    </div>
  )
}

export default InfoComponent
