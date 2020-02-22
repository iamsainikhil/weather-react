import React from 'react'
import './LoaderStyle.scss'

const LoaderComponent = ({loaderText}) => {
  return (
    <div className='flex flex-col w-full justify-center items-center'>
      <div className='spinner'>
        <div className='double-bounce1'></div>
        <div className='double-bounce2'></div>
      </div>
      {loaderText && (
        <div className='text-sm font-light'>
          {loaderText}
          <span className='text-2xl text-fade'>...</span>
        </div>
      )}
    </div>
  )
}

export default LoaderComponent
