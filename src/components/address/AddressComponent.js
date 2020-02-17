import React from 'react'
import './AddressStyle.scss'

const AddressComponent = props => {
  return (
    <p
      className='px-5 py-1 cursor-pointer item'
      onClick={props.addressSelected}>
      {props.address.cityName}
    </p>
  )
}

export default AddressComponent
