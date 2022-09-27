import React, {useContext} from 'react'
import {WeatherUnitContext} from '../../context/WeatherUnitContext'
import {fToC} from '../../utils/TemperatureConvert'
import getWeatherIcon from '../../utils/WeatherIcon'
import FormatTime from './../../utils/FormatTime'
import {PropTypes} from 'prop-types'
import WeatherIconComponent from './WeatherIconComponent'
import AssetsSrcURL from '../../utils/AssetsSrcURL'

const DayComponent = (props) => {
  const {day, index, selectedIndex} = props
  const {description} = day.weather[0]
  const {weatherUnit} = useContext(WeatherUnitContext)

  /**
   * type can be 'High' or 'Low'
   * @param {String} type
   */
  const computedTempValue = (type) => {
    return weatherUnit === 'F'
      ? Math.round(day.temp[type])
      : fToC(day.temp[type])
  }

  // emit event to forecastContainer
  const selectedDay = () => {
    props.selectedDay({day})
  }

  const activeDayStyle = () => {
    return index === selectedIndex
      ? {
          backdropFilter: 'blur(1px)',
          WebkitBackdropFilter: 'blur(1px)',
          background: 'rgba(17, 25, 40, 0.5)',
          borderRadius: '10px',
        }
      : null
  }

  return (
    <div
      className={`items-center text-center sm:flex-1 sm:py-1 sm:pb-3 cursor-pointer`}
      style={activeDayStyle()}
      onClick={selectedDay}>
      <div className='flex flex-row flex-no-wrap sm:flex-col sm:flex-wrap justify-around items-center px-2'>
        <p className='flex w-1/6 sm:w-full sm:justify-center text-base font-semibold md:pt-1'>
          {FormatTime(day.dt, day.timezone, 'ddd')}
        </p>
        {/* icon */}
        <div className='flex w-1/6 sm:w-full'>
          {getWeatherIcon(day).startsWith('wi') ? (
            <p
              className='my-1 sm:mt-1 sm:mb-3 mx-auto text-3xl'
              title={description}>
              <WeatherIconComponent type={getWeatherIcon(day)} />
            </p>
          ) : (
            <img
              src={`${AssetsSrcURL}/weather/${getWeatherIcon(day)}.svg`}
              alt='icon'
              title={description}
              className='sm:-mt-2 sm:-mb-1 mx-auto w-12 h-12 sm:w-16 sm:h-16 object-contain'
            />
          )}
        </div>
        {/* high & low */}
        <div className='flex flex-row justify-center items-center font-light w-1/4 sm:w-full mt-1 sm:mt-0'>
          <p className='mx-2 text-xs sm:text-sm'>
            {computedTempValue('max')}
            <sup>o</sup>
          </p>
          <p className='mx-2 text-xs'>
            {computedTempValue('min')}
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
            <p>{FormatTime(day.sunrise, day.timezone, 'h:mm')}</p>
          </div>
          <div className='flex flex-row justify-center items-center mx-2 sm:my-1 text-xs sm:text-sm'>
            <p
              className='text-xl lg:text-2xl text-sun mr-2 md:mr-1'
              title='sunset'>
              <WeatherIconComponent type='sunset' />
            </p>
            <p>{FormatTime(day.sunset, day.timezone, 'HH:mm')}</p>
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
  selectedIndex: PropTypes.number,
}
