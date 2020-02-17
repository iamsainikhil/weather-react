import React, {Fragment} from 'react'

const InfoDetailComponent = props => {
  const iconURL = `/weather_icons/${props.currentWeather.wx_icon}`

  const unitClick = unit => {
    props.unitClicked(unit)
  }

  /**
   * type can be `temp` or `feels_like`
   * @param {String} type
   */
  const computedTempValue = type => {
    return props.unit === 'F'
      ? Math.round(props.currentWeather[`${type}_f`])
      : Math.round(props.currentWeather[`${type}_c`])
  }

  const computedSpeedValue = () => {
    return props.unit === 'F'
      ? `${Math.round(props.currentWeather.windspd_mph)} MPH`
      : `${Math.round(props.currentWeather.windspd_kmh)} KMPH`
  }

  return (
    <Fragment>
      <div className='sm:flex-col md:flex md:flex-row justify-between mt-10 mb-5'>
        <div className='w-1/2'>
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
                    props.unit === 'F' ? 'font-bold underline' : ''
                  }`}
                  onClick={() => unitClick('F')}>
                  F
                </span>
                /
                <span
                  className={`cursor-pointer ${
                    props.unit === 'C' ? 'font-bold underline' : ''
                  }`}
                  onClick={() => unitClick('C')}>
                  C
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className='w-1/2'>
          <p>Humidity: {props.currentWeather.humid_pct}%</p>
          <p>
            Wind: {computedSpeedValue()} {props.currentWeather.winddir_compass}
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
