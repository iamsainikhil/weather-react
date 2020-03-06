import React, {useContext, Fragment} from 'react'
import {imageExist, getImageDetails} from '../../utils/ImageDetails'
import {ThemeContext} from '../../context/ThemeContext'
import {PropTypes} from 'prop-types'

// get image details
const getImage = urbanArea => {
  const {image} = getImageDetails(urbanArea)
  return image
}
const imageOverlay = {
  background: 'rgba(0,0,0,0.55)',
  borderTopLeftRadius: '1rem',
  borderTopRightRadius: '1rem'
}

const FavoriteComponent = ({favorite, favoriteSelected}) => {
  const {theme, colorTheme} = useContext(ThemeContext)
  return (
    <div className='relative w-full h-16'>
      {imageExist(favorite.urbanArea) ? (
        <Fragment>
          <img
            src={getImage(favorite.urbanArea).web}
            alt='city'
            className='h-full w-full object-cover object-center rounded-2xl'
          />
        </Fragment>
      ) : null}
      <div
        className={`${
          imageExist(favorite.urbanArea)
            ? 'absolute top-0 left-0 right-0 bottom-0 text-light'
            : `h-16 text-${colorTheme} border border-${colorTheme} bg-${theme} text-${colorTheme} hover:bg-${colorTheme} hover:text-${theme}`
        } pt-5 lg:pt-1/2 font-semibold rounded-2xl shadow-lg cursor-pointer text-center justify-center`}
        style={imageExist(favorite.urbanArea) ? imageOverlay : null}
        onClick={favoriteSelected}>
        {favorite.address.cityName.split(', ')[0]}
      </div>
    </div>
  )
}

export default FavoriteComponent

FavoriteComponent.propTypes = {
  favorite: PropTypes.object,
  favoriteSelected: PropTypes.func
}
