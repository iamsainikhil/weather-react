import React, {useContext} from 'react'
import dayjs from 'dayjs'
import FormatTime from '../../utils/FormatTime'
import {WeatherUnitContext} from '../../context/WeatherUnitContext'

const DayComponent = ({day, unit}) => {
  const {weatherUnit} = useContext(WeatherUnitContext)
  const computedTempValue = type => {
    return Math.round(day[`temp_${type}_${weatherUnit.toLowerCase()}`])
  }

  return (
    <div className='border border-gray-400 text-center flex-1 py-1'>
      <p>
        {dayjs(
          day.date
            .split('/')
            .reverse()
            .join(', ')
        ).format('ddd')}
      </p>
      <p className='text-2xl'>
        {computedTempValue('max')}
        <sup>o</sup>
      </p>
      <p className='text-xl'>
        {computedTempValue('min')}
        <sup>o</sup>
      </p>
      <p className='text-sm'>
        &#9728;&nbsp;{FormatTime(`${day.sunrise_time}`)}
      </p>
      <p className='text-sm'>&#9790;&nbsp;{FormatTime(`${day.sunset_time}`)}</p>
    </div>
  )
}

export default DayComponent
