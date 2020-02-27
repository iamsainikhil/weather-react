import React, {useContext} from 'react'
import dayjs from 'dayjs'
import FormatTime from '../../utils/FormatTime'
import {WeatherUnitContext} from '../../context/WeatherUnitContext'
import {ThemeContext} from '../../context/ThemeContext'
import getWeatherIcon from '../../utils/WeatherIcon'

const DayComponent = props => {
  const {day, icon, iconDesc, index, selectedIndex} = props
  const {weatherUnit} = useContext(WeatherUnitContext)
  const {theme, colorTheme} = useContext(ThemeContext)

  const computedTempValue = type => {
    return Math.round(day[`temp_${type}_${weatherUnit.toLowerCase()}`])
  }

  const selectedDay = () => {
    props.selectedDay({day, index})
  }

  return (
    <div
      className={`sm:border-t sm:border-r sm:border-b-0 sm:border-l-0 sm:border-${colorTheme} sm:hover:bg-${colorTheme} sm:hover:text-${theme} items-center text-center flex-1 py-1 pb-3 cursor-pointer ${
        index === selectedIndex ? `sm:bg-${colorTheme} sm:text-${theme}` : ''
      } transition-colors duration-1000 ease-in-out`}
      onClick={selectedDay}>
      <p className='font-medium'>
        {dayjs(
          day.date
            .split('/')
            .reverse()
            .join(', ')
        ).format('ddd')}
      </p>
      <i
        title={iconDesc}
        className={`mx-auto text-xl wi wi-${getWeatherIcon(icon)}`}></i>
      <div className='flex flex-row justify-center items-center font-light'>
        <p className='mx-2 text-sm'>
          {computedTempValue('max')}
          <sup>o</sup>
        </p>
        <p className='mx-2 text-xs'>
          {computedTempValue('min')}
          <sup>o</sup>
        </p>
      </div>
      <div className='flex flex-row justify-center sm:flex-col font-light mt-1'>
        <div className='flex flex-row justify-center items-center mx-2'>
          <i className='text-sm wi wi-sunrise text-sun' title='sunrise'></i>
          <p className='text-sm ml-2'>{FormatTime(`${day.sunrise_time}`)}</p>
        </div>
        <div className='flex flex-row justify-center items-center mx-2'>
          <i className='text-sm wi wi-sunset text-sun' title='sunset'></i>
          <p className='text-sm ml-2'>{FormatTime(`${day.sunset_time}`)}</p>
        </div>
      </div>
    </div>
  )
}

export default DayComponent
