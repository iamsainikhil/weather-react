import React from 'react'
import {PropTypes} from 'prop-types'
import {FaSun, FaMoon} from 'react-icons/fa'

const IconComponent = ({iconType}) => {
  return (
    <div>
      {iconType === 'light' ? (
        <p className='text-toggle'>
          <FaSun />
        </p>
      ) : (
        <p className='text-toggle'>
          <FaMoon />
        </p>
      )}
    </div>
  )
}

export default IconComponent

IconComponent.propTypes = {
  iconType: PropTypes.string
}
