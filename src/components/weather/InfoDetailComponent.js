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
import getWeatherBackground from './../../utils/WeatherBackground'

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

  const WET_TYPES = ['rain', 'snow', 'sleet', 'hail']

  // return rain or snow svg image for the above wet types
  const weatherSVG = () => {
    if (weatherCurrent.icon === 'snow') {
      return 'snow'
    }
    return 'rain'
  }

  return (
    <Fragment>
      <div className='relative'>
        <img
          src={`./weather-backgrounds/${getWeatherBackground(
            weatherCurrent
          )}.jpg`}
          alt='clear day'
          className='w-full h-64 sm:h-48 object-cover object-center'
        />
        {/* show rain or snow svg only when weather icon exist in WET_TYPES*/}
        <div>
          {WET_TYPES.includes(weatherCurrent.icon) && (
            <img
              src={`./weather-backgrounds/${weatherSVG()}.svg`}
              alt='clear day'
              className='w-full h-64 sm:h-48 object-cover object-center absolute top-0 right-0 bottom-0 left-0'
            />
          )}
        </div>
        <div
          className='absolute top-0 bottom-0 left-0 right-0 my-auto mx-auto'
          style={{background: 'rgba(0,0,0,0.2)'}}>
          <div className='sm:flex-col md:flex md:flex-row justify-between my-2 px-6 sm:mt-5 sm:mb-5 sm:px-4'>
            <div className='flex-col sm:w-full lg:w-1/2'>
              <div className='flex flex-row justify-between sm:justify-start'>
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
                        src={`./weather/${getWeatherIcon(weatherCurrent)}.svg`}
                        alt='icon'
                        title={weatherCurrent.summary}
                        className='-mt-2 -ml-4 sm:mx-0 w-32 h-32 object-contain'
                      />
                    )}
                  </div>
                  <p className='hidden sm:flex font-medium -mt-2 capitalize'>
                    {weatherCurrent.summary}
                  </p>
                </div>
                <div className='flex justify-start items-center sm:ml-3'>
                  <div>
                    <span className='text-6xl font-bold'>
                      {computedTempValue('temperature')}
                    </span>
                  </div>
                  <div className='-mt-8 mx-2 text-sm'>
                    <sup>o</sup>
                    <span
                      className={`cursor-pointer ${
                        weatherUnit === 'F'
                          ? 'font-bold underline'
                          : 'font-light'
                      }`}
                      onClick={() => unitClick('F')}>
                      F
                    </span>
                    <span className='mx-1'>|</span>
                    <sup>o</sup>
                    <span
                      className={`cursor-pointer ${
                        weatherUnit === 'C'
                          ? 'font-bold underline'
                          : 'font-light'
                      }`}
                      onClick={() => unitClick('C')}>
                      C
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
              <div className='text-sm sm:text-lg ml-8'>
                <div className='flex flex-row sm:my-2'>
                  <p className='font-light'>Humidity:</p>&nbsp;
                  <p className='mx-1'>{Math.round(weatherCurrent.humidity)}</p>
                  <p className='text-sm mt-1'>
                    <FiPercent />
                  </p>
                </div>
                <div className='flex items-center sm:my-2'>
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
                  <span className='font-light sm:my-2'>Feels like:</span>&nbsp;
                  {computedTempValue('apparentTemperature')}
                  <sup>o</sup>
                </p>
              </div>
            </div>
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
