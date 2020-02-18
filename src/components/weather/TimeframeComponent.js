import React from 'react'
import FormatTime from '../../utils/FormatTime'

const TimeframeComponent = ({timeFrame}) => {
  const iconURL = `/weather_icons/${timeFrame.wx_icon}`

  const computedTempValue = type => {
    const unit = JSON.parse(localStorage.getItem('unit'))
    return Math.round(timeFrame[`${type}_${unit.toLowerCase()}`])
  }
  return (
    <div>
      <img src={iconURL} alt='weather icon' />
      <p className='xl'>{computedTempValue('temp')}</p>
      <p className='text-lg'>Feels like {computedTempValue('feelslike')}</p>
      <p>{FormatTime(`${timeFrame.time}`)}</p>
    </div>
  )
}

export default TimeframeComponent
