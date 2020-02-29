import React, {useContext} from 'react'
import {WeatherUnitContext} from '../../context/WeatherUnitContext'
import {ThemeContext} from '../../context/ThemeContext'
import getWeatherIcon from '../../utils/WeatherIcon'
import {fToC} from '../../utils/TemperatureConvert'
import dayjs from 'dayjs'

const TimeframeComponent = ({Timeframe}) => {
  const {weatherUnit} = useContext(WeatherUnitContext)
  const {theme} = useContext(ThemeContext)

  /**
   * type can be `temperature` or `apparentTemperature`
   * @param {String} type
   */
  const computedTempValue = type => {
    return weatherUnit === 'F'
      ? Timeframe[`${type}`]
      : fToC(Timeframe[`${type}`])
  }

  // format time
  const formatTime = timestamp => {
    return dayjs(timestamp).format('H:mm A')
  }

  return (
    <div
      className={`border-none flex flex-col justify-start items-center mx-3 mb-3 w-full font-light text-${
        theme === 'light' ? 'dark' : 'light'
      }`}>
      <i
        title={Timeframe.summary}
        className={`wi wi-forecast-io-${getWeatherIcon(
          Timeframe.icon
        )} text-xl`}></i>
      <p className='text-xl'>
        {computedTempValue('temperature')}
        <sup>o</sup>
      </p>
      <p className='text-sm italic'>
        {computedTempValue('apparentTemperature')}
        <sup>o</sup>
      </p>
      <p className='text-sm font-medium'>{formatTime(`${Timeframe.time}`)}</p>
    </div>
  )
}

export default TimeframeComponent
