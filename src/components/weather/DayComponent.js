import React, {useContext} from 'react'
import {WeatherUnitContext} from '../../context/WeatherUnitContext'
import {fToC} from '../../utils/TemperatureConvert'
import getWeatherIcon from '../../utils/WeatherIcon'
import FormatTime from './../../utils/FormatTime'
import {PropTypes} from 'prop-types'
import WeatherIconComponent from './WeatherIconComponent'
import {ThemeContext} from '../../context/ThemeContext'

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

  // emit event to forecastContainer
  const selectedDay = () => {
    props.selectedDay({day})
  }

  // hide or show right and left sides of a border
  const specialBorder = () => {
    return `md:border-r${
      index === 7 || index === selectedIndex - 1 ? '-0' : ''
    } md:border-l${index === 0 || index === selectedIndex + 1 ? '-0' : ''}`
  }

  return (
    <div
      className={`md:border-t md:border-b-0 md:border-light md:hover:border-light md:hover:bg-light md:hover:text-black items-center text-center sm:flex-1 sm:py-1 sm:pb-3 cursor-pointer transition-all duration-1000 ease-in-out ${
        index === selectedIndex
          ? `bg-${colorTheme} text-${theme} md:border-${colorTheme}`
          : ''
      } ${specialBorder()}`}
      onClick={selectedDay}>
      <div className='flex flex-row flex-no-wrap sm:flex-col sm:flex-wrap justify-around items-center px-2'>
        <p className='flex w-1/6 sm:w-full sm:justify-center text-base font-light sm:font-medium'>
          {FormatTime(day.time, day.timezone, 'ddd')}
        </p>
        {/* icon */}
        <div className='flex w-1/6 sm:w-full'>
          {getWeatherIcon(day).startsWith('wi') ? (
            <p
              className='my-1 sm:mt-1 sm:mb-3 mx-auto text-3xl'
              title={day.summary}>
              <WeatherIconComponent type={getWeatherIcon(day)} />
            </p>
          ) : (
            <img
              src={`./weather/${getWeatherIcon(day)}.svg`}
              alt='icon'
              title={day.summary}
              className='sm:-mt-3 sm:-mb-1 mx-auto w-12 h-12 sm:w-16 sm:h-16 object-contain'
            />
          )}
        </div>
        {/* high & low */}
        <div className='flex flex-row justify-center items-center font-light w-1/4 sm:w-full mt-1 sm:mt-0'>
          <p className='mx-2 text-xs sm:text-sm'>
            {computedTempValue('High')}
            <sup>o</sup>
          </p>
          <p className='mx-2 text-xs'>
            {computedTempValue('Low')}
            <sup>o</sup>
          </p>
        </div>
        {/* sunrise & sunset */}
        <div
          className={`${
            index === selectedIndex ? 'flex' : 'flex'
          } flex-row justify-around sm:justify-center sm:flex sm:flex-col w-5/12 sm:w-full font-light mt-1`}>
          <div className='flex flex-row justify-center items-center mx-2 sm:my-1 text-xs sm:text-sm'>
            <p
              className='text-xl lg:text-2xl text-sun mr-2 md:mr-3'
              title='sunrise'>
              <WeatherIconComponent type='sunrise' />
            </p>
            <p>{FormatTime(day.sunriseTime, day.timezone, 'h:mm')}</p>
          </div>
          <div className='flex flex-row justify-center items-center mx-2 sm:my-1 text-xs sm:text-sm'>
            <p
              className='text-xl lg:text-2xl text-sun mr-2 md:mr-1'
              title='sunset'>
              <WeatherIconComponent type='sunset' />
            </p>
            <p>{FormatTime(day.sunsetTime, day.timezone, 'HH:mm')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DayComponent

DayComponent.propTypes = {
  day: PropTypes.object,
  selectedDay: PropTypes.func,
  index: PropTypes.number,
  selectedIndex: PropTypes.number
}
