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
import AssetsSrcURL from '../../utils/AssetsSrcURL'

const InfoDetailComponent = ({weatherCurrent}) => {
  const {weatherUnit, updateWeatherUnit} = useContext(WeatherUnitContext)
  const unitClick = (unit) => {
    // track event to GA
    Event({
      category: 'Weather Unit',
      action: 'Set Unit',
      label: unit,
    })
    updateWeatherUnit(unit)
  }

  /**
   * type can be `temperature` or `apparentTemperature`
   * @param {String} type
   */
  const computedTempValue = (type) => {
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
      <div className='sm:flex-col md:flex md:flex-row justify-between my-2 px-6 sm:mt-5 sm:mb-5 sm:px-4'>
        <div className='flex-col sm:w-full lg:w-1/2'>
          <div className='flex flex-row justify-center sm:justify-start sm:items-center'>
            <div className='flex flex-col justify-center items-center'>
              <div>
                {getWeatherIcon(weatherCurrent).startsWith('wi') ? (
                  <p
                    className='text-6xl sm:mx-2 mt-2'
                    title={weatherCurrent.summary}>
                    {
                      <WeatherIconComponent
                        type={getWeatherIcon(weatherCurrent)}
                      />
                    }
                  </p>
                ) : (
                  <img
                    src={`${AssetsSrcURL}/weather/${getWeatherIcon(
                      weatherCurrent
                    )}.svg`}
                    alt='icon'
                    title={weatherCurrent.summary}
                    className='-mt-2 -ml-4 sm:mx-0 w-32 h-32 object-contain'
                  />
                )}
              </div>
              <p className='hidden sm:flex sm:flex-no-wrap font-medium -mt-2 ml-3 capitalize'>
                {weatherCurrent.summary}
              </p>
            </div>
            <div className='flex justify-start items-center sm:-mt-3 sm:ml-3'>
              <div>
                <span className='text-6xl font-bold'>
                  {computedTempValue('temperature')}
                </span>
              </div>
              <p className='-mt-8 text-3xl'>
                <sup>o</sup>
              </p>
              <div className='-mt-10 mx-2 text-xl'>
                <span
                  className={`cursor-pointer ${
                    weatherUnit === 'C'
                      ? 'font-bold border-b border-light'
                      : 'font-light opacity-75'
                  }`}
                  title='Celcius'
                  onClick={() => unitClick('C')}>
                  C
                </span>
                <span className={`mx-1 opacity-25`}>|</span>
                <span
                  className={`cursor-pointer ${
                    weatherUnit === 'F'
                      ? 'font-bold border-b border-light'
                      : 'font-light opacity-75'
                  }`}
                  title='Fahrenheit'
                  onClick={() => unitClick('F')}>
                  F
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* weather info */}
        <div className='flex flex-col justify-center items-center sm:mt-6 sm:w-full lg:w-1/2'>
          <p className='sm:hidden font-medium capitalize text-2xl -mt-2 mb-2'>
            {weatherCurrent.summary}
          </p>
          <div className='text-sm sm:text-lg ml-8 mt-3 sm:mt-0'>
            <div className='flex flex-row sm:my-2'>
              <p className='font-light'>Humidity:</p>&nbsp;
              <p className='mx-1 font-bold'>
                {Math.round(weatherCurrent.humidity * 100)}
              </p>
              <p className='text-sm mt-1'>
                <FiPercent />
              </p>
            </div>
            <div className='flex items-center sm:my-2'>
              <p>
                <span className='font-light'>Wind:</span>&nbsp;
                <span className='font-bold'>{computedSpeedValue()} </span>
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
              <span className='font-light sm:my-2'>Feels like:</span>&nbsp;
              <span className='font-bold'>
                {computedTempValue('apparentTemperature')}
              </span>
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
  weatherCurrent: PropTypes.object,
}
