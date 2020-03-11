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
  background: 'rgba(0,0,0,0.7)',
  borderTopLeftRadius: '1rem',
  borderTopRightRadius: '1rem'
}

const FavoriteComponent = ({
  favorite,
  favoriteSelected,
  index,
  selectedIndex
}) => {
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
            ? `absolute top-0 left-0 right-0 bottom-0 text-light ${
                index === selectedIndex
                  ? 'sm:shadow-outline'
                  : 'sm:outline-none'
              }`
            : `h-16 text-${colorTheme} bg-${theme} hover:bg-${colorTheme} hover:text-${theme} border ${
                index === selectedIndex
                  ? 'sm:border-teal-600'
                  : `sm:border-${colorTheme}`
              }`
        } pt-5 lg:pt-1/2 font-semibold rounded-2xl cursor-pointer text-center justify-center`}
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
  favoriteSelected: PropTypes.func,
  index: PropTypes.number,
  selectedIndex: PropTypes.number
}
