import React, {useContext} from 'react'
import {ThemeContext} from '../../context/ThemeContext'
import {PropTypes} from 'prop-types'

const AddressComponent = props => {
  const {theme, colorTheme} = useContext(ThemeContext)
  return (
    <p
      className={`px-5 py-1 cursor-pointer item text-${colorTheme} hover:text-${theme} hover:bg-${colorTheme}`}
      onClick={props.addressSelected}>
      {props.address.cityName}
    </p>
  )
}

export default AddressComponent

AddressComponent.propTypes = {
  addressSelected: PropTypes.func,
  address: PropTypes.objectOf(PropTypes.string)
}
