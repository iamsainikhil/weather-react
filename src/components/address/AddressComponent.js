import React, {useContext} from 'react'
import './AddressStyle.scss'
import {ThemeContext} from '../../context/ThemeContext'

const AddressComponent = props => {
  const {theme, colorTheme} = useContext(ThemeContext)
  return (
    <p
      className={`px-5 py-1 cursor-pointer item text-${colorTheme}`}
      style={{backgroundColor: `${theme}`}}
      onClick={props.addressSelected}>
      {props.address.cityName}
    </p>
  )
}

export default AddressComponent
