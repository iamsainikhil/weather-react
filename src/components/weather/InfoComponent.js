import React, {useState, useEffect, useContext} from 'react'
import {AddressContext} from '../../context/AddressContext'
import dayjs from 'dayjs'

const InfoComponent = () => {
  const {address} = useContext(AddressContext)
  const [date, setDate] = useState(dayjs().format('MMMM DD, YYYY'))
  const [time, setTime] = useState(dayjs().format('dddd h:mm A'))

  useEffect(() => {
    const dateTimer = setInterval(() => {
      setDate(dayjs().format('MMMM DD, YYYY'))
      setTime(dayjs().format('dddd h:mm A'))
    }, 1000)
    return () => {
      clearInterval(dateTimer)
    }
  }, [address.cityName])

  return (
    <div>
      <p className='font-bold'>{address.cityName}</p>
      <div className='sm:flex-col md:flex md:flex-row'>
        <p>
          {date}
          <span className='invisible md:visible'>&nbsp;|&nbsp;</span>
        </p>
        <p>{time}</p>
      </div>
    </div>
  )
}

export default InfoComponent
