import React, {useContext} from 'react'
import {ThemeContext} from '../../context/ThemeContext'
import {PropTypes} from 'prop-types'

const FavoriteComponent = ({
  favorite,
  favoriteSelected,
  index,
  selectedIndex,
}) => {
  const {theme, colorTheme} = useContext(ThemeContext)
  return (
    <div
      className={`h-16 text-${colorTheme} bg-${theme} hover:bg-${colorTheme} hover:text-${theme} border ${
        index === selectedIndex
          ? 'sm:border-teal-600'
          : `sm:border-${colorTheme}`
      }
        } pt-5 lg:pt-1/2 font-semibold rounded-2xl cursor-pointer text-center justify-center`}
      onClick={favoriteSelected}>
      {favorite.address.cityName.split(', ')[0]}
    </div>
  )
}

export default FavoriteComponent

FavoriteComponent.propTypes = {
  favorite: PropTypes.object,
  favoriteSelected: PropTypes.func,
  index: PropTypes.number,
  selectedIndex: PropTypes.number,
}
