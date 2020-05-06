import React, {useContext} from 'react'
import {FaExclamationTriangle} from 'react-icons/fa'
import {ThemeContext} from '../../context/ThemeContext'
import FormatTime from './../../utils/FormatTime'

const AlertComponent = ({alert}) => {
  const {timezone, title, time, expires, description, uri} = alert
  const {theme, colorTheme} = useContext(ThemeContext)
  const startTime = FormatTime(time, timezone, 'dddd h:mm A')
  const endTime = FormatTime(expires, timezone, 'dddd h:mm A')

  return (
    <div className={'flex flex-col justify-center items-center'}>
      <div className={`sm:w-full lg:w-4/6 xl:max-w-5xl`}>
        <div
          className={`bg-${theme} border-t-4 border border-red-700 rounded-lg text-${colorTheme} px-4 py-3 shadow-xl`}
          role='alert'>
          <div className='flex'>
            <div className='py-1 px-2'>
              <FaExclamationTriangle className='text-red-700 text-xl' />
            </div>
            <div>
              <div className='flex flex-row justify-between items-center'>
                <p className='font-bold'>{title}</p>
                <p className='font-semibold text-sm'>
                  <span>{startTime}</span>
                  &nbsp;<span>-</span>&nbsp;
                  <span>{endTime}</span>
                </p>
              </div>
              <p className='text-xs lowercase py-1'>{description}</p>
              <a
                href={uri}
                target='_blank'
                rel='noreferrer noopener'
                className={`link z-0 text-xs font-medium hover:text-${theme}`}>
                View Details
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AlertComponent
