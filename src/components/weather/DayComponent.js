import React, {useContext} from 'react'
import dayjs from 'dayjs'
import moment from 'moment-timezone'
import {WeatherUnitContext} from '../../context/WeatherUnitContext'
import {ThemeContext} from '../../context/ThemeContext'
import {fToC} from '../../utils/TemperatureConvert'
import getWeatherIcon from '../../utils/WeatherIcon'

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

  // format sunrise & sunset
  const formatTime = timestamp => {
    // use the timezone in the day to format the timestamp
    return moment.tz(timestamp * 1000, day.timezone).format('HH:mm')
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
      <p className='font-medium'>{dayjs(day.time * 1000).format('ddd')}</p>
      <i
        title={day.summary}
        className={`mx-auto text-xl wi wi-${getWeatherIcon(
          day.icon,
          day.timezone
        )}`}></i>
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
        <div className='flex flex-row justify-center items-center mx-2'>
          <i className='text-sm wi wi-sunrise text-sun' title='sunrise'></i>
          <p className='text-sm ml-2'>{formatTime(day.sunriseTime)}</p>
        </div>
        <div className='flex flex-row justify-center items-center mx-2'>
          <i className='text-sm wi wi-sunset text-sun' title='sunset'></i>
          <p className='text-sm ml-2'>{formatTime(day.sunsetTime)}</p>
        </div>
      </div>
    </div>
  )
}

export default DayComponent
