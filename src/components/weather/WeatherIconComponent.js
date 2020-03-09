import React from 'react'
import {
  WiDirectionUp,
  WiDirectionUpRight,
  WiDirectionRight,
  WiDirectionDownRight,
  WiDirectionDown,
  WiDirectionDownLeft,
  WiDirectionLeft,
  WiDirectionUpLeft,
  WiDayFog,
  WiNightFog,
  WiDayCloudyWindy,
  WiNightAltCloudyWindy,
  WiTornado,
  WiNa,
  WiSunrise,
  WiSunset
} from 'react-icons/wi'

const WeatherIconComponent = ({type}) => {
  const ICON_TYPES = {
    'wi-day-fog': <WiDayFog />,
    'wi-night-fog': <WiNightFog />,
    'wi-day-windy': <WiDayCloudyWindy />,
    'wi-night-windy': <WiNightAltCloudyWindy />,
    'wi-tornado': <WiTornado />,
    'wi-na': <WiNa />,
    up: <WiDirectionUp />,
    'up-right': <WiDirectionUpRight />,
    right: <WiDirectionRight />,
    'down-right': <WiDirectionDownRight />,
    down: <WiDirectionDown />,
    'down-left': <WiDirectionDownLeft />,
    left: <WiDirectionLeft />,
    'up-left': <WiDirectionUpLeft />,
    sunrise: <WiSunrise />,
    sunset: <WiSunset />
  }

  return ICON_TYPES[type] || <WiNa />
}

export default WeatherIconComponent
