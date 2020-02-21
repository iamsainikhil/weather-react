import React, {useContext} from 'react'
import dayjs from 'dayjs'
import FormatTime from '../../utils/FormatTime'
import {WeatherUnitContext} from '../../context/WeatherUnitContext'

const DayComponent = props => {
  const {day, icon, iconDesc, index, selectedIndex} = props
  const {weatherUnit} = useContext(WeatherUnitContext)
  const iconURL = `/weather_icons/${icon}`

  const computedTempValue = type => {
    return Math.round(day[`temp_${type}_${weatherUnit.toLowerCase()}`])
  }

  const selectedDay = () => {
    props.selectedDay({day, index})
  }

  return (
    <div
      className={`border border-gray-400 items-center text-center flex-1 py-1 pb-3 cursor-pointer ${
        index === selectedIndex ? 'sm:bg-gray-400' : ''
      }`}
      onClick={selectedDay}>
      <div className='flex flex-row justify-center sm:flex-col'>
        <p>
          {dayjs(
            day.date
              .split('/')
              .reverse()
              .join(', ')
          ).format('ddd')}
        </p>
        <img
          src={iconURL}
          alt='weather icon'
          title={iconDesc}
          className='sm:mx-auto'
        />
      </div>
      <div className='flex flex-row justify-around sm:flex-col'>
        <p className='text-xl'>
          {computedTempValue('max')}
          <sup>o</sup>
        </p>
        <p className='text-lg'>
          {computedTempValue('min')}
          <sup>o</sup>
        </p>
      </div>
      <div className='flex flex-row justify-around sm:flex-col'>
        <p className='text-sm'>
          <span title={'sunrise'}>&#9728;</span>{' '}
          {FormatTime(`${day.sunrise_time}`)}
        </p>
        <p className='text-sm'>
          <span title={'sunset'}>&#9790;</span>{' '}
          {FormatTime(`${day.sunset_time}`)}
        </p>
      </div>
    </div>
  )
}

export default DayComponent
