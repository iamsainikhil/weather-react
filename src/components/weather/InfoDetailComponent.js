import React, {Fragment, useContext} from 'react'
import {WeatherUnitContext} from '../../context/WeatherUnitContext'
import getWindDirection from '../../utils/WindDirection'
import getWeatherIcon from '../../utils/WeatherIcon'

const InfoDetailComponent = ({weatherCurrent}) => {
  const {weatherUnit, updateWeatherUnit} = useContext(WeatherUnitContext)

  const unitClick = unit => {
    updateWeatherUnit(unit)
  }

  /**
   * type can be `temp` or `feels_like`
   * @param {String} type
   */
  const computedTempValue = type => {
    return Math.round(weatherCurrent[`${type}_${weatherUnit.toLowerCase()}`])
  }

  const computedSpeedValue = () => {
    return weatherUnit === 'F'
      ? `${Math.round(weatherCurrent.windspd_mph)} mph`
      : `${Math.round(weatherCurrent.windspd_kmh)} kmph`
  }

  return (
    <Fragment>
      <div className='sm:flex-col md:flex md:flex-row justify-between mt-5 mb-5 px-4'>
        <div className='flex-col sm:w-full lg:w-1/2'>
          <div className='flex flex-row items-center'>
            <div>
              <i
                className={`wi wi-${getWeatherIcon(
                  weatherCurrent.wx_icon
                )} text-4xl mt-3 mr-2`}
                title={weatherCurrent.wx_desc}></i>
            </div>
            <div className='flex justify-start items-center'>
              <div>
                <span className='text-5xl font-bold'>
                  {computedTempValue('temp')}
                </span>
              </div>
              <div className='text-2xl -mt-6'>
                <i
                  className={`wi wi-fahrenheit cursor-pointer mx-2 ${
                    weatherUnit === 'F' ? 'font-bold underline' : ''
                  }`}
                  onClick={() => unitClick('F')}></i>
                |
                <i
                  className={`wi wi-celsius cursor-pointer mx-2 ${
                    weatherUnit === 'C' ? 'font-bold underline' : ''
                  }`}
                  onClick={() => unitClick('C')}></i>
              </div>
            </div>
          </div>
          <p className='sm:ml-3 capitalize'>{weatherCurrent.wx_desc}</p>
        </div>
        <div className='sm:w-full lg:w-1/2'>
          <p>
            <span className='font-light'>Humidity:</span>&nbsp;
            {weatherCurrent.humid_pct}%
          </p>
          <div className='flex items-center'>
            <p>
              <span className='font-light'>Wind:</span>&nbsp;
              {computedSpeedValue()}{' '}
            </p>
            <p>
              <i
                className={`mx-2 mt-2 text-3xl wi wi-direction-${getWindDirection(
                  weatherCurrent.winddir_deg
                )}`}></i>
            </p>
          </div>
          <p>
            <span className='font-light'>Feels like:</span>&nbsp;
            {computedTempValue('feelslike')}
            <sup>o</sup>
          </p>
        </div>
      </div>
    </Fragment>
  )
}

export default InfoDetailComponent
