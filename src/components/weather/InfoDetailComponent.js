import React from 'react'
import ReactAnimatedWeather from 'react-animated-weather'

const InfoDetailComponent = props => {
  const unitClick = unit => {
    props.unitClicked(unit)
  }

  const defaults = {
    color: 'goldenrod',
    size: 64,
    animate: true
  }

  const getIcon = icon => {
    const {id, suffix} = icon
    switch (id) {
      case 500 || 501 || 502:
        return 'RAIN'
      case 600 || 601 || 602:
        return 'SNOW'
      case 701 || 711 || 721:
        return 'FOG'
      case 800:
        return suffix === 'd' ? 'CLEAR_DAY' : 'CLEAR_NIGHT'
      case 801 || 802:
        return suffix === 'd' ? 'PARTLY_CLOUDY_DAY' : 'PARTLY_CLOUDY_NIGHT'
      case 803 || 804:
        return 'CLOUDY'
      case id >= 952 && id <= 960:
        return 'WIND'
      default:
        return ''
    }
  }

  return (
    <div className='flex mt-10 mb-5'>
      <div className='w-1/2'>
        <div className='flex justify-between items-end'>
          <div
            className={`flex ${getIcon(props.data.icon) ? 'w-1/4' : 'w-1/6'}`}>
            {getIcon(props.data.icon) ? (
              <ReactAnimatedWeather
                icon={getIcon(props.data.icon)}
                color={defaults.color}
                size={defaults.size}
                animate={defaults.animate}
              />
            ) : (
              <i
                className={`text-5xl owf owf-${props.data.icon.id}-${props.data.icon.suffix}`}></i>
            )}
          </div>
          <div
            className={`flex ${getIcon(props.data.icon) ? 'w-3/4' : 'w-5/6'}`}>
            <div>
              <span className='text-5xl'>{props.data.main.temp}</span>
            </div>
            <div>
              <sup>o</sup>
              <span
                className={`cursor-pointer ml-2 ${
                  props.data.unit === 'F' ? 'font-bold underline' : ''
                }`}
                onClick={() => unitClick('F')}>
                F
              </span>
              /
              <span
                className={`cursor-pointer ${
                  props.data.unit === 'C' ? 'font-bold underline' : ''
                }`}
                onClick={() => unitClick('C')}>
                C
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className='w-1/2 justify-end'>
        <p>Humidity: {props.data.main.humidity}%</p>
        <p>
          Wind: {props.data.wind.speed} {props.data.wind.deg}
        </p>
        <p>
          Feels like: {props.data.main.feelsLike}
          <sup>o</sup>
        </p>
      </div>
    </div>
  )
}

export default InfoDetailComponent
