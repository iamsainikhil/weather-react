import React, {useState, useEffect} from 'react'
import {format} from 'date-fns'

const InfoComponent = ({currentWeather, address}) => {
  const [date, setDate] = useState(format(new Date(), 'eeee h:mm a'))
  useEffect(() => {
    const dateTimer = setInterval(() => {
      setDate(format(new Date(), 'eeee h:mm a'))
    }, 1000)
    return () => {
      clearInterval(dateTimer)
    }
  }, [currentWeather])
  return (
    <div>
      <p className='font-bold'>{address.cityName}</p>
      <div className='sm:flex-col md:flex md:flex-row'>
        <p>
          {date}
          <span className='invisible md:visible'>&nbsp;.&nbsp;</span>
        </p>
        <p>{currentWeather.wx_desc}</p>
      </div>
    </div>
  )
}

export default InfoComponent
