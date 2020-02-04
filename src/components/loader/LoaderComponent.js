import React from 'react'
import './LoaderStyle.scss'

const LoaderComponent = () => {
  return (
    <div className='flex w-1/2'>
      <div className='spinner'>
        <div className='double-bounce1'></div>
        <div className='double-bounce2'></div>
      </div>
    </div>
  )
}

export default LoaderComponent
