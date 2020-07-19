import React, {useContext} from 'react'
import {ThemeContext} from '../../context/ThemeContext'
import {PropTypes} from 'prop-types'

const AddressComponent = ({
  address,
  selectedAddressIndex,
  index,
  addressSelected,
}) => {
  const {theme, colorTheme} = useContext(ThemeContext)

  return (
    <p
      className={`px-5 py-1 cursor-pointer item hover:text-${theme} hover:bg-${colorTheme} ${
        index === selectedAddressIndex
          ? `text-${theme} bg-${colorTheme}`
          : `text-${colorTheme}`
      }`}
      onClick={addressSelected}>
      {address.cityName}
    </p>
  )
}

export default AddressComponent

AddressComponent.propTypes = {
  addressSelected: PropTypes.func,
  address: PropTypes.objectOf(PropTypes.string),
  selectedAddressIndex: PropTypes.number,
  index: PropTypes.number,
}
