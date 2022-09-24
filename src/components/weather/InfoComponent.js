import React, {useState, useEffect, useRef, Fragment} from 'react'
import {isUndefined, isEmpty} from 'lodash-es'
import moment from 'moment-timezone'
import {PropTypes} from 'prop-types'

const InfoComponent = ({address, weatherCurrent}) => {
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')

  // store formattedDateTime moment date object in the ref and update it for the first api call fetch
  // this ref will be used to update date and time every second without making additional api calls
  const formattedDateTimeRef = useRef()

  // format and set date & time based on the dateObj
  const datetimeSetter = (dateObj) => {
    setDate(!isUndefined(dateObj) ? dateObj.format('dddd, MMMM DD, YYYY') : '')
    setTime(!isUndefined(dateObj) ? dateObj.format('h:mm A') : '')
    formattedDateTimeRef.current = dateObj ? dateObj : null
  }

  useEffect(() => {
    // reset date & time whenever weatherCurrent change
    datetimeSetter(moment(weatherCurrent.dt * 1000).tz(weatherCurrent.timezone))

    const dateTimer = setInterval(() => {
      if (weatherCurrent.dt) {
        // update date and time every second only when there is a valid timestamp
        const formattedDateTimeObj = moment
          .tz(formattedDateTimeRef.current, weatherCurrent.timezone)
          .add(1, 's')
        datetimeSetter(formattedDateTimeObj)
      }
    }, 1000)
    return () => {
      clearInterval(dateTimer)
    }
    // eslint-disable-next-line
  }, [weatherCurrent])

  return (
    <div className='flex justify-between items-start'>
      <div className='pt-4 px-4'>
        <p className='font-bold'>{address.cityName || 'City, Country'}</p>
        <div className='sm:flex-col md:flex md:flex-row font-light'>
          {!isEmpty(date) && !isEmpty(time) ? (
            <Fragment>
              <p>
                {date}
                <span className='invisible md:visible'>&nbsp;|&nbsp;</span>
              </p>
              <p>{time}</p>
            </Fragment>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default InfoComponent

InfoComponent.propTypes = {
  address: PropTypes.object,
  weatherCurrent: PropTypes.object,
}
