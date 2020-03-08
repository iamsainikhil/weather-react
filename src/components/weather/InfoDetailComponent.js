import React, {Fragment, useContext} from 'react'
import {WeatherUnitContext} from '../../context/WeatherUnitContext'
import getWindDirection from '../../utils/WindDirection'
import getWeatherIcon from '../../utils/WeatherIcon'
import {mToK} from '../../utils/SpeedConvert'
import {fToC} from '../../utils/TemperatureConvert'
import {PropTypes} from 'prop-types'
import {Event} from '../../utils/ReactAnalytics'

const InfoDetailComponent = ({weatherCurrent}) => {
  const {weatherUnit, updateWeatherUnit} = useContext(WeatherUnitContext)

  const unitClick = unit => {
    // track event to GA
    Event({
      category: 'Weather Unit',
      action: 'Set Unit',
      label: unit
    })
    updateWeatherUnit(unit)
  }

  /**
   * type can be `temperature` or `apparentTemperature`
   * @param {String} type
   */
  const computedTempValue = type => {
    return weatherUnit === 'F'
      ? Math.round(weatherCurrent[`${type}`])
      : fToC(weatherCurrent[`${type}`])
  }

  const computedSpeedValue = () => {
    return weatherUnit === 'F'
      ? `${Math.round(weatherCurrent.windSpeed)} mph`
      : `${mToK(weatherCurrent.windSpeed)} kmph`
  }

  return (
    <Fragment>
      <div className='sm:flex-col md:flex md:flex-row justify-between mt-5 mb-5 px-4'>
        <div className='flex-col sm:w-full lg:w-1/2'>
          <div className='flex flex-row items-start'>
            <div className='flex flex-col'>
              <div>
                {getWeatherIcon(weatherCurrent).startsWith('wi') ? (
                  <i
                    className={`${getWeatherIcon(
                      weatherCurrent
                    )} text-5xl mr-2 mx-3`}
                    title={weatherCurrent.summary}></i>
                ) : (
                  <img
                    src={`./weather/${getWeatherIcon(weatherCurrent)}.svg`}
                    alt='icon'
                    title={weatherCurrent.summary}
                    className='-mt-2 w-20 h-20 object-contain'
                  />
                )}
              </div>
              <p className='font-medium ml-3 capitalize'>
                {weatherCurrent.summary}
              </p>
            </div>
            <div className='flex justify-start items-center ml-3'>
              <div>
                <span className='text-5xl font-bold'>
                  {computedTempValue('temperature')}
                </span>
              </div>
              <div className='-mt-8 mx-2 text-sm'>
                <sup>o</sup>
                <span
                  className={`cursor-pointer ${
                    weatherUnit === 'F' ? 'font-bold underline' : 'font-light'
                  }`}
                  onClick={() => unitClick('F')}>
                  F
                </span>
                <span className='mx-1'>|</span>
                <sup>o</sup>
                <span
                  className={`cursor-pointer ${
                    weatherUnit === 'C' ? 'font-bold underline' : 'font-light'
                  }`}
                  onClick={() => unitClick('C')}>
                  C
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-6 ml-3 sm:mt-1 sm:w-full lg:w-1/2 text-sm sm:text-lg'>
          <p>
            <span className='font-light'>Humidity:</span>&nbsp;
            {Math.round(weatherCurrent.humidity)}%
          </p>
          <div className='flex items-center'>
            <p>
              <span className='font-light'>Wind:</span>&nbsp;
              {computedSpeedValue()}{' '}
            </p>
            <p>
              <i
                className={`mx-2 mt-2 text-3xl wi wi-direction-${getWindDirection(
                  weatherCurrent.windBearing
                )}`}></i>
            </p>
          </div>
          <p>
            <span className='font-light'>Feels like:</span>&nbsp;
            {computedTempValue('apparentTemperature')}
            <sup>o</sup>
          </p>
        </div>
      </div>
    </Fragment>
  )
}

export default InfoDetailComponent

InfoDetailComponent.propTypes = {
  weatherCurrent: PropTypes.object
}
