import React, {useContext} from 'react'
import dayjs from 'dayjs'
import FormatTime from '../../utils/FormatTime'
import {WeatherUnitContext} from '../../context/WeatherUnitContext'

const DayComponent = props => {
  const {day, icon, iconDesc, index, selectedIndex} = props
  const {weatherUnit} = useContext(WeatherUnitContext)

  const getIconURL = iconType => {
    return `/weather_icons/${iconType}`
  }

  const computedTempValue = type => {
    return Math.round(day[`temp_${type}_${weatherUnit.toLowerCase()}`])
  }

  const selectedDay = () => {
    props.selectedDay({day, index})
  }

  return (
    <div
      className={`sm:border sm:border-gray-400 items-center text-center flex-1 py-1 pb-3 cursor-pointer ${
        index === selectedIndex ? 'sm:bg-gray-400' : ''
      }`}
      onClick={selectedDay}>
      {/* <div className='flex flex-row justify-center sm:flex-col'> */}
      <p>
        {dayjs(
          day.date
            .split('/')
            .reverse()
            .join(', ')
        ).format('ddd')}
      </p>
      <img
        src={getIconURL(icon)}
        alt='weather icon'
        title={iconDesc}
        className='mx-auto'
      />
      {/* </div>*/}
      <div className='flex flex-row justify-center sm:flex-col'>
        <p className='text-xl mx-2'>
          {computedTempValue('max')}
          <sup>o</sup>
        </p>
        <p className='text-lg mx-2'>
          {computedTempValue('min')}
          <sup>o</sup>
        </p>
      </div>
      <div className='flex flex-row justify-center sm:flex-col'>
        <div className='flex flex-row justify-center items-center mx-2'>
          <img
            src={getIconURL('Sunny.gif')}
            alt='weather icon'
            title='sunrise'
            className='w-6'
          />
          <p className='text-sm'>{FormatTime(`${day.sunrise_time}`)}</p>
        </div>
        <div className='flex flex-row justify-center items-center mx-2'>
          <img
            src={getIconURL('PartlyCloudyDay.gif')}
            alt='weather icon'
            title='sunset'
            className='w-6'
          />
          <p className='text-sm'>{FormatTime(`${day.sunset_time}`)}</p>
        </div>
      </div>
    </div>
  )
}

export default DayComponent
