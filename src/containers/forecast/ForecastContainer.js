import React, {useState, useEffect, Fragment} from 'react'
import dayjs from 'dayjs'
import {isEmpty, isUndefined} from 'lodash-es'
import Carousel from 'nuka-carousel'
import DayComponent from '../../components/weather/DayComponent'
import TimeframeComponent from '../../components/weather/TimeframeComponent'
import LoaderComponent from '../../components/loader/LoaderComponent'
import CarouselSettings from '../../utils/CarouselSettings'
import ErrorComponent from './../../components/error/ErrorComponent'
import ErrorBoundaryContainer from '../error-boundary/ErrorBoundaryContainer'

const ForecastContainer = ({cityName, weatherForecast, formattedDateTime}) => {
  const [errorMessage, setErrorMessage] = useState('')
  const [selectedDay, setSelectedDay] = useState('')

  // set the selectedDay to the current day by fetching current city date and time from FormattedDateTime
  const updateSelectedDay = async () => {
    // show forecast elements when formattedDateTime is not an empty string & an error message starting with Failed
    if (formattedDateTime && !formattedDateTime.includes('Failed')) {
      const today = dayjs(formattedDateTime).format('MM/DD/YYYY')
      // check if today key exist in days
      if (!isEmpty(weatherForecast) && !isUndefined(weatherForecast)) {
        setSelectedDay(weatherForecast.days[today] ? today : '')
      }
    } else {
      setErrorMessage(formattedDateTime)
    }
  }

  /**
   * day is a date '02/28/2020'
   * @param {String} day
   */
  const daySelectHandler = day => {
    setSelectedDay(day)
  }

  useEffect(() => {
    updateSelectedDay()
    // eslint-disable-next-line
  }, [formattedDateTime])

  return (
    <ErrorBoundaryContainer>
      <Fragment>
        {!isEmpty(weatherForecast.days) && !isEmpty(selectedDay) ? (
          <Fragment>
            {/* mobile */}
            <div className='sm:hidden py-3'>
              {weatherForecast.timeFrames[selectedDay] ? (
                <Carousel {...CarouselSettings('time')}>
                  {weatherForecast.timeFrames[selectedDay].map(
                    (Timeframe, index) => {
                      return (
                        <TimeframeComponent Timeframe={Timeframe} key={index} />
                      )
                    }
                  )}
                </Carousel>
              ) : (
                <ErrorComponent
                  errorMessage={`No hourly forecast available for ${selectedDay}`}
                />
              )}
            </div>
            {/* tablet and above devices */}
            <div className='hidden sm:flex py-3 mb-3'>
              {weatherForecast.timeFrames[selectedDay] ? (
                <Carousel {...CarouselSettings('time', 'tablet')}>
                  {weatherForecast.timeFrames[selectedDay].map(
                    (Timeframe, index) => {
                      return (
                        <TimeframeComponent Timeframe={Timeframe} key={index} />
                      )
                    }
                  )}
                </Carousel>
              ) : (
                <ErrorComponent
                  errorMessage={`No hourly forecast available for ${selectedDay}`}
                />
              )}
            </div>

            {/* mobile */}
            <div className='sm:hidden py-3'>
              <Carousel
                {...CarouselSettings('day')}
                slideIndex={Object.keys(weatherForecast.days).indexOf(
                  selectedDay
                )}
                afterSlide={slideIndex =>
                  daySelectHandler(
                    Object.keys(weatherForecast.days)[slideIndex]
                  )
                }>
                {Object.keys(weatherForecast.days).map((day, index) => {
                  return (
                    <DayComponent
                      day={weatherForecast.days[day]}
                      key={index}
                      index={day}
                      selectedIndex={selectedDay}
                      selectedDay={() => daySelectHandler(day)}
                    />
                  )
                })}
              </Carousel>
            </div>
            {/* table and above devices */}
            <div className={`hidden sm:flex w-full rounded sm:visible`}>
              {Object.keys(weatherForecast.days).map((day, index) => {
                // day is key in weatherForecast.days -> '02/28/2020'
                // index is the position of key -> 0
                return (
                  <DayComponent
                    day={weatherForecast.days[day]}
                    key={index}
                    index={day}
                    selectedIndex={selectedDay}
                    selectedDay={() => daySelectHandler(day)}
                  />
                )
              })}
            </div>
          </Fragment>
        ) : (
          <div className='mb-3'>
            {isEmpty(weatherForecast.days) || errorMessage ? (
              <ErrorComponent
                errorMessage={
                  isEmpty(weatherForecast.days)
                    ? 'No forecast data available for this city!'
                    : errorMessage
                }
                showCloseBtn={false}
              />
            ) : (
              <LoaderComponent
                loaderText={`Fetching 7 days weather forecast for ${cityName}`}
              />
            )}
          </div>
        )}
      </Fragment>
    </ErrorBoundaryContainer>
  )
}

export default ForecastContainer
