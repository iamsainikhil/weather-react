import React, {useState, useEffect, Fragment} from 'react'
import DayComponent from '../../components/weather/DayComponent'
import TimeframeComponent from '../../components/weather/TimeframeComponent'
import dayjs from 'dayjs'
import FetchDateTime from '../../utils/FetchDateTime'
import {findIndex} from 'lodash-es'
import LoaderComponent from '../../components/loader/LoaderComponent'

const ForecastContainer = ({weatherForecast, latlong}) => {
  // set the selectedDayIndex to the current day
  const getToday = async () => {
    const formattedDateTime = await FetchDateTime(latlong)
    if (formattedDateTime) {
      return formattedDateTime.date
    }
    return dayjs().format('MMMM DD, YYYY')
  }

  const [selectedDayIndex, setSelectedDayIndex] = useState(-1)

  const daySelectHandler = index => {
    setSelectedDayIndex(index)
  }

  // show/hide days on mobile
  const [daysVisible, setDaysVisible] = useState(false)
  const toggleDaysVisibilityHandler = () => {
    setDaysVisible(state => !state)
  }

  useEffect(() => {
    // fetch current city date and time using FetchDateTime
    getToday()
      .then(response => {
        const today = dayjs(response).format('DD/MM/YYYY')
        const todayIndex = findIndex(weatherForecast.Days, ['date', today])
        setSelectedDayIndex(todayIndex < 0 ? todayIndex + 1 : todayIndex)
      })
      .catch(err => console.log(err))
    // eslint-disable-next-line
  }, [latlong])

  return (
    <Fragment>
      {selectedDayIndex >= 0 ? (
        <Fragment>
          <div className='hidden sm:visible sm:flex sm:flex-row py-3'>
            {weatherForecast.Days[selectedDayIndex]
              ? weatherForecast.Days[selectedDayIndex].Timeframes.map(
                  (Timeframe, index) => {
                    return (
                      <TimeframeComponent Timeframe={Timeframe} key={index} />
                    )
                  }
                )
              : null}
          </div>
          <div className='sm:hidden text-center mb-4'>
            <button
              className='bg-gray-500 hover:bg-gray-700 text-white text-sm tracking-wider uppercase font-bold py-2 px-4 rounded-full'
              onClick={toggleDaysVisibilityHandler}>
              {daysVisible ? 'collapse' : 'expand'}
            </button>
          </div>
          <div
            className={`flex-col sm:flex sm:flex-row w-full rounded ${
              daysVisible ? 'visible' : 'hidden'
            } sm:visible`}>
            {weatherForecast.Days
              ? weatherForecast.Days.map((day, index) => {
                  return (
                    <DayComponent
                      day={day}
                      key={index}
                      index={index}
                      selectedIndex={selectedDayIndex}
                      selectedDay={() => daySelectHandler(index)}
                    />
                  )
                })
              : null}
          </div>
        </Fragment>
      ) : (
        <LoaderComponent />
      )}
    </Fragment>
  )
}

export default ForecastContainer
