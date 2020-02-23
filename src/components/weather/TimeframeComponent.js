import React, {useContext} from 'react'
import FormatTime from '../../utils/FormatTime'
import {WeatherUnitContext} from '../../context/WeatherUnitContext'
import {ThemeContext} from '../../context/ThemeContext'

const TimeframeComponent = ({Timeframe}) => {
  const iconURL = `/weather_icons/${Timeframe.wx_icon}`
  const {weatherUnit} = useContext(WeatherUnitContext)
  const {theme} = useContext(ThemeContext)

  const computedTempValue = type => {
    return Math.round(Timeframe[`${type}_${weatherUnit.toLowerCase()}`])
  }
  return (
    <div
      className={`border-none flex flex-col justify-start items-center mx-3 mb-3 w-full font-light text-${
        theme === 'light' ? 'dark' : 'light'
      }`}>
      <img src={iconURL} alt='weather icon' title={Timeframe.wx_desc} />
      <p className='text-xl'>
        {computedTempValue('temp')}
        <sup>o</sup>
      </p>
      <p className='text-sm italic'>
        {computedTempValue('feelslike')}
        <sup>o</sup>
      </p>
      <p className='text-sm font-medium'>{FormatTime(`${Timeframe.time}`)}</p>
    </div>
  )
}

export default TimeframeComponent
