import React from 'react'
import {PropTypes} from 'prop-types'

const IconComponent = ({iconType}) => {
  return (
    <div>
      {iconType === 'light' ? (
        <img src='./sun.svg' alt='Light' />
      ) : (
        <img src='./moon.svg' alt='Dark' />
      )}
    </div>
  )
}

export default IconComponent

IconComponent.propTypes = {
  iconType: PropTypes.string
}
