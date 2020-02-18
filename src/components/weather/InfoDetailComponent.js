import React, {Fragment, useContext} from 'react'
import WeatherContext from '../../context/WeatherContext'
import {WeatherUnitContext} from '../../context/WeatherUnitContext'

const InfoDetailComponent = props => {
  const {weatherCurrent} = useContext(WeatherContext)
  const {weatherUnit} = useContext(WeatherUnitContext)
  const iconURL = `/weather_icons/${weatherCurrent.wx_icon}`

  const unitClick = unit => {
    props.unitClicked(unit)
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
      ? `${Math.round(weatherCurrent.windspd_mph)} MPH`
      : `${Math.round(weatherCurrent.windspd_kmh)} KMPH`
  }

  return (
    <Fragment>
      <div className='sm:flex-col md:flex md:flex-row justify-between mt-10 mb-5'>
        <div className='flex-col sm:w-full lg:w-1/2'>
          <div className='flex flex-row items-center'>
            <div className='flex'>
              <img
                src={iconURL}
                alt='weather icon'
                className='sm:w-12 sm:h-8'
              />
            </div>
            <div className='flex'>
              <div>
                <span className='text-3xl'>{computedTempValue('temp')}</span>
              </div>
              <div>
                <span className='text-2xl'>o</span>
                <span
                  className={`cursor-pointer ml-2 ${
                    weatherUnit === 'F' ? 'font-bold underline' : ''
                  }`}
                  onClick={() => unitClick('F')}>
                  F
                </span>
                /
                <span
                  className={`cursor-pointer ${
                    weatherUnit === 'C' ? 'font-bold underline' : ''
                  }`}
                  onClick={() => unitClick('C')}>
                  C
                </span>
              </div>
            </div>
          </div>
          <p>{weatherCurrent.wx_desc}</p>
        </div>
        <div className='sm:w-full lg:w-1/2'>
          <p>Humidity: {weatherCurrent.humid_pct}%</p>
          <p>
            Wind: {computedSpeedValue()} {weatherCurrent.winddir_compass}
          </p>
          <p>
            Feels like: {computedTempValue('feelslike')}
            <sup>o</sup>
          </p>
        </div>
      </div>
    </Fragment>
  )
}

export default InfoDetailComponent
