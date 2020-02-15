import React, {useState, useEffect} from 'react'
import {format} from 'date-fns'

const InfoComponent = ({address, currentWeatherCondition}) => {
  const [date, setDate] = useState(format(new Date(), 'eeee K:mm a'))
  useEffect(() => {
    const dateTimer = setInterval(() => {
      setDate(format(new Date(), 'eeee K:mm a'))
    }, 60000)
    return () => {
      clearInterval(dateTimer)
    }
  }, [address, currentWeatherCondition])
  return (
    <div>
      <p className='font-bold'>{address}</p>
      <p>
        {date} . {currentWeatherCondition}
      </p>
    </div>
  )
}

export default InfoComponent
