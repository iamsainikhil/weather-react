import React, {useContext} from 'react'
import {WeatherUnitContext} from '../../context/WeatherUnitContext'
import {fToC} from '../../utils/TemperatureConvert'
import getWeatherIcon from '../../utils/WeatherIcon'
import FormatTime from './../../utils/FormatTime'
import {PropTypes} from 'prop-types'
import WeatherIconComponent from './WeatherIconComponent'
import {ThemeContext} from '../../context/ThemeContext'
import AssetsSrcURL from '../../utils/AssetsSrcURL'

const TimeframeComponent = ({Timeframe}) => {
  const {weatherUnit} = useContext(WeatherUnitContext)
  const {colorTheme} = useContext(ThemeContext)

  /**
   * type can be `temperature` or `apparentTemperature`
   * @param {String} type
   */
  const computedTempValue = (type) => {
    return weatherUnit === 'F'
      ? Math.round(Timeframe[`${type}`])
      : fToC(Timeframe[`${type}`])
  }

  return (
    <div
      className={`border-none flex flex-col justify-start items-center mx-3 mb-3 w-full font-light text-${colorTheme} md:text-light timeframe`}>
      <div>
        {getWeatherIcon(Timeframe).startsWith('wi') ? (
          <p className='text-5xl mt-4' title={Timeframe.summary}>
            <WeatherIconComponent type={getWeatherIcon(Timeframe)} />
          </p>
        ) : (
          <img
            src={`${AssetsSrcURL}/weather/${getWeatherIcon(Timeframe)}.svg`}
            alt='icon'
            title={Timeframe.summary}
            className='w-16 h-16 object-contain'
          />
        )}
      </div>
      <p className='text-base pb-1'>
        {computedTempValue('temperature')}
        <sup>o</sup>
      </p>
      <p className='text-xs pb-1'>
        {computedTempValue('apparentTemperature')}
        <sup>o</sup>
      </p>
      <p className='text-sm font-medium'>
        {FormatTime(Timeframe.time, Timeframe.timezone, 'h:mm A')}
      </p>
    </div>
  )
}

export default TimeframeComponent

TimeframeComponent.propTypes = {
  Timeframe: PropTypes.object,
}
