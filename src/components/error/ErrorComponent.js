import React, {useContext} from 'react'
import {ThemeContext} from '../../context/ThemeContext'
import './ErrorStyle.scss'

const ErrorComponent = (props) => {
  const {theme} = useContext(ThemeContext)
  return (
    <div
      className={`w-11/12 sm:w-3/4 md:w-5/6 ml-auto mr-auto h-auto bg-${theme} border border-red-400 text-red-700 mt-5 px-4 py-2 rounded relative`}
      role='alert'>
      <span className='w-5/6 block break-words text-sm'>
        {props.errorMessage}
      </span>
      {props.showCloseBtn && (
        <span
          className='absolute top-0 bottom-0 right-0 ml-3 mr-1'
          onClick={props.closeError}>
          <svg
            className='fill-current h-6 w-6 text-red-500 close-icon'
            role='button'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'>
            <title>Close</title>
            <path d='M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z' />
          </svg>
        </span>
      )}
    </div>
  )
}

export default ErrorComponent
