import React from 'react'

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
