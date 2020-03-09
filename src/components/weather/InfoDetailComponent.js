import React, {Fragment, useContext} from 'react'
import {WeatherUnitContext} from '../../context/WeatherUnitContext'
import getWindDirection from '../../utils/WindDirection'
import getWeatherIcon from '../../utils/WeatherIcon'
import {mToK} from '../../utils/SpeedConvert'
import {fToC} from '../../utils/TemperatureConvert'
import {PropTypes} from 'prop-types'
import {Event} from '../../utils/ReactAnalytics'
import {FiPercent} from 'react-icons/fi'
import WeatherIconComponent from './WeatherIconComponent'

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
          <div className='flex flex-row justify-between  sm:justify-start'>
            <div>
              {getWeatherIcon(weatherCurrent).startsWith('wi') ? (
                <p
                  className='text-5xl ml-6 mr-2'
                  title={weatherCurrent.summary}>
                  {
                    <WeatherIconComponent
                      type={getWeatherIcon(weatherCurrent)}
                    />
                  }
                </p>
              ) : (
                <img
                  src={`./weather/${getWeatherIcon(weatherCurrent)}.svg`}
                  alt='icon'
                  title={weatherCurrent.summary}
                  className='-mt-2 w-24 h-24 object-contain'
                />
              )}
            </div>
            <div className='flex justify-start items-center pr-6 sm:ml-3'>
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
          <p className='hidden sm:flex font-medium ml-6 capitalize'>
            {weatherCurrent.summary}
          </p>
        </div>
        <div className='flex flex-row justify-between sm:flex-col sm:mt-1 sm:w-full lg:w-1/2'>
          <p className='sm:hidden font-medium ml-6 capitalize text-xl'>
            {weatherCurrent.summary}
          </p>
          <div className='text-sm sm:text-lg'>
            <div className='flex flex-row'>
              <p className='font-light'>Humidity:</p>&nbsp;
              <p className='mx-1'>{Math.round(weatherCurrent.humidity)}</p>
              <p className='text-sm mt-1'>
                <FiPercent />
              </p>
            </div>
            <div className='flex items-center'>
              <p>
                <span className='font-light'>Wind:</span>&nbsp;
                {computedSpeedValue()}{' '}
              </p>
              <p className='text-3xl'>
                {
                  <WeatherIconComponent
                    type={getWindDirection(weatherCurrent.windBearing)}
                  />
                }
              </p>
            </div>
            <p>
              <span className='font-light'>Feels like:</span>&nbsp;
              {computedTempValue('apparentTemperature')}
              <sup>o</sup>
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default InfoDetailComponent

InfoDetailComponent.propTypes = {
  weatherCurrent: PropTypes.object
}
