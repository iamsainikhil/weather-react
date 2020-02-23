import React from 'react'

const IconComponent = ({iconType}) => {
  return (
    <div>
      {iconType === 'light' ? (
        <img
          src='https://dorshinar.me/static/e68e53031bdadb8dd5d3b44414ca8133/4c427/icons8-sun-48.png'
          alt='light mode'
        />
      ) : (
        <img
          src='https://dorshinar.me/static/2741acac554fa61fa1ece416d6f21573/7830d/icons8-moon-and-stars-160.png'
          alt='dark mode'
        />
      )}
    </div>
  )
}

export default IconComponent
