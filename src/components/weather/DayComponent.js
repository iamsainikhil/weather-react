import React, {useContext} from 'react'
import {WeatherUnitContext} from '../../context/WeatherUnitContext'
import {ThemeContext} from '../../context/ThemeContext'
import {fToC} from '../../utils/TemperatureConvert'
import getWeatherIcon from '../../utils/WeatherIcon'
import FormatTime from './../../utils/FormatTime'
import {PropTypes} from 'prop-types'

const DayComponent = props => {
  const {day, index, selectedIndex} = props
  const {weatherUnit} = useContext(WeatherUnitContext)
  const {theme, colorTheme} = useContext(ThemeContext)

  /**
   * type can be 'High' or 'Low'
   * @param {String} type
   */
  const computedTempValue = type => {
    return weatherUnit === 'F'
      ? Math.round(day[`temperature${type}`])
      : fToC(day[`temperature${type}`])
  }

  const selectedDay = () => {
    props.selectedDay({day})
  }

  return (
    <div
      className={`sm:border-t sm:border-r sm:border-b-0 sm:border-l-0 sm:border-${colorTheme} sm:hover:bg-${colorTheme} sm:hover:text-${theme} items-center text-center flex-1 py-1 pb-3 cursor-pointer ${
        index === selectedIndex ? `sm:bg-${colorTheme} sm:text-${theme}` : ''
      } transition-colors duration-1000 ease-in-out`}
      onClick={selectedDay}>
      <p className='font-medium'>{FormatTime(day.time, day.timezone, 'ddd')}</p>
      <div>
        {getWeatherIcon(day).startsWith('wi') ? (
          <i
            title={day.summary}
            className={`mt-1 mb-3 mx-auto text-2xl wi wi-${getWeatherIcon(
              day
            )}`}></i>
        ) : (
          <img
            src={`./weather/${getWeatherIcon(day)}.svg`}
            alt='icon'
            title={day.summary}
            className='-mt-3 -mb-1 mx-auto w-16 h-16 object-contain'
          />
        )}
      </div>
      <div className='flex flex-row justify-center items-center font-light'>
        <p className='mx-2 text-sm'>
          {computedTempValue('High')}
          <sup>o</sup>
        </p>
        <p className='mx-2 text-xs'>
          {computedTempValue('Low')}
          <sup>o</sup>
        </p>
      </div>
      <div className='flex flex-row justify-center sm:flex-col font-light mt-1'>
        <div className='flex flex-row justify-center items-center mx-2 sm:my-1'>
          <i
            className='text-sm wi wi-sunrise text-sun mr-2'
            title='sunrise'></i>
          <p className='text-sm'>
            {FormatTime(day.sunriseTime, day.timezone, 'h:mm')}
          </p>
        </div>
        <div className='flex flex-row justify-center items-center mx-2 sm:my-1'>
          <i className='text-sm wi wi-sunset text-sun mr-1' title='sunset'></i>
          <p className='text-sm'>
            {FormatTime(day.sunsetTime, day.timezone, 'HH:mm')}
          </p>
        </div>
      </div>
    </div>
  )
}

export default DayComponent

DayComponent.propTypes = {
  day: PropTypes.object,
  selectedDay: PropTypes.func,
  index: PropTypes.string,
  selectedIndex: PropTypes.string
}
