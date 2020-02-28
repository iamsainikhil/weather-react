import React, {useState, useEffect, Fragment} from 'react'
import dayjs from 'dayjs'
import {findIndex, isEmpty} from 'lodash-es'
import Carousel from 'nuka-carousel'
import DayComponent from '../../components/weather/DayComponent'
import TimeframeComponent from '../../components/weather/TimeframeComponent'
import LoaderComponent from '../../components/loader/LoaderComponent'
import GroupedDayIcons from '../../utils/GroupedDayIcons'
import CarouselSettings from '../../utils/CarouselSettings'
import ErrorComponent from './../../components/error/ErrorComponent'

const ForecastContainer = ({cityName, weatherForecast, formattedDateTime}) => {
  const [errorMessage, setErrorMessage] = useState('')
  const [selectedDayIndex, setSelectedDayIndex] = useState(-1)
  const [dayIcons, setDayIcons] = useState({})

  // set the selectedDayIndex to the current day by fetching current city date and time from FormattedDateTime
  const updateSelectedDay = async () => {
    // show forecast elements when formattedDateTime is not an empty string & an error message starting with Failed
    if (formattedDateTime && !formattedDateTime.includes('Failed')) {
      const today = dayjs(formattedDateTime).format('DD/MM/YYYY')
      const todayIndex = findIndex(weatherForecast.Days, ['date', today])
      setSelectedDayIndex(todayIndex < 0 ? 0 : todayIndex)
    } else {
      setErrorMessage(formattedDateTime)
    }
  }

  const daySelectHandler = index => {
    setSelectedDayIndex(index)
  }

  // find weather icon and desc for every day in weatherForecast Days based on the most common weather_icon of the timeframes
  const updateDayIcons = () => {
    const icons = GroupedDayIcons(weatherForecast, 'wx_icon')
    const iconsDesc = GroupedDayIcons(weatherForecast, 'wx_desc')
    setDayIcons({icons: [...icons], iconDesc: [...iconsDesc]})
  }

  useEffect(() => {
    updateSelectedDay()
    updateDayIcons()
    // eslint-disable-next-line
  }, [formattedDateTime])

  return (
    <Fragment>
      {!isEmpty(weatherForecast.Days) && selectedDayIndex !== -1 ? (
        <Fragment>
          {/* mobile */}
          <div className='sm:hidden py-3'>
            <Carousel {...CarouselSettings('time')}>
              {weatherForecast.Days[selectedDayIndex]
                ? weatherForecast.Days[selectedDayIndex].Timeframes.map(
                    (Timeframe, index) => {
                      return (
                        <TimeframeComponent Timeframe={Timeframe} key={index} />
                      )
                    }
                  )
                : null}
            </Carousel>
          </div>
          {/* tablet and above devices */}
          <div className='hidden sm:flex py-3'>
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

          {/* mobile */}
          <div className='sm:hidden py-3'>
            <Carousel
              {...CarouselSettings('day')}
              slideIndex={selectedDayIndex}
              afterSlide={slideIndex => daySelectHandler(slideIndex)}>
              {weatherForecast.Days
                ? weatherForecast.Days.map((day, index) => {
                    return (
                      <DayComponent
                        day={day}
                        key={index}
                        index={index}
                        icon={dayIcons.icons[index]}
                        iconDesc={dayIcons.iconDesc[index]}
                        selectedIndex={selectedDayIndex}
                        selectedDay={() => daySelectHandler(index)}
                      />
                    )
                  })
                : null}
            </Carousel>
          </div>
          {/* table and above devices */}
          <div className={`hidden sm:flex w-full rounded sm:visible`}>
            {weatherForecast.Days
              ? weatherForecast.Days.map((day, index) => {
                  return (
                    <DayComponent
                      day={day}
                      key={index}
                      index={index}
                      icon={dayIcons.icons[index]}
                      iconDesc={dayIcons.iconDesc[index]}
                      selectedIndex={selectedDayIndex}
                      selectedDay={() => daySelectHandler(index)}
                    />
                  )
                })
              : null}
          </div>
        </Fragment>
      ) : (
        <div className='mb-3'>
          {isEmpty(weatherForecast.Days) || errorMessage ? (
            <ErrorComponent
              errorMessage={
                isEmpty(weatherForecast.Days)
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
  )
}

export default ForecastContainer
