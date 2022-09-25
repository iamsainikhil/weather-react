import React, {useContext} from 'react'
import {FaExclamationTriangle, FaEye} from 'react-icons/fa'
import {ThemeContext} from '../../context/ThemeContext'
import FormatTime from './../../utils/FormatTime'
import isValid from '../../utils/ValidityChecker'

const AlertComponent = ({alert}) => {
  const {
    timezone,
    event: title,
    start: time,
    end: expires,
    description,
    tags,
  } = alert
  const {theme, colorTheme} = useContext(ThemeContext)
  const startTime = FormatTime(time, timezone, 'dddd h:mm A')
  const endTime = FormatTime(expires, timezone, 'dddd h:mm A')
  const severity = alert.severity || 'warning'
  const severityColor = severity === 'warning' ? 'red' : 'orange'

  return (
    <div className={'flex flex-col justify-center items-center'}>
      <div className={`w-11/12 lg:w-3/4 xl:max-w-5xl`}>
        <div
          className={`bg-${theme} border-t-4 border border-${severityColor}-700 rounded-lg text-${colorTheme} px-3 py-3 shadow-xl`}
          role='alert'>
          <div className='flex'>
            <div className='pt-1 px-2'>
              {severity === 'watch' ? (
                <FaEye className='text-toggle text-lg' title={severity} />
              ) : (
                <FaExclamationTriangle
                  className={`text-${severityColor}-700 text-lg`}
                  title={severity}
                />
              )}
            </div>
            <div className='w-full'>
              <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center'>
                <p className='sm:w-1/2 font-bold capitalize'>
                  {title === 'No Text' ? severity : title}
                </p>
                <p className='sm:w-1/2 sm:text-right font-semibold text-xs'>
                  <span>{startTime}</span>
                  &nbsp;<span>-</span>&nbsp;
                  <span>{endTime}</span>
                </p>
              </div>
              <p className='text-sm lowercase py-1'>{description}</p>
              {/* tags */}
              {isValid(tags) ? (
                <p className='text-sm font-medium py-2'>
                  <b>Tags:&nbsp;</b>
                  {tags.map((region, index) => {
                    return (
                      <i key={index}>
                        {region}
                        {index === tags.length - 1 ? '.' : ', '}
                      </i>
                    )
                  })}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AlertComponent
