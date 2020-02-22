import React, {useState, useEffect, Fragment} from 'react'
import dayjs from 'dayjs'
import {indexOf} from 'lodash-es'
import Carousel from 'nuka-carousel'
import DayComponent from '../../components/weather/DayComponent'
import TimeframeComponent from '../../components/weather/TimeframeComponent'
import LoaderComponent from '../../components/loader/LoaderComponent'
import FormattedDateTime from '../../utils/FormattedDateTime'
import GroupedDayIcons from '../../utils/GroupedDayIcons'
import CarouselSettings from '../../utils/CarouselSettings'

const ForecastContainer = ({weatherForecast, latlong}) => {
  // set the selectedDayIndex to the current day by fetching current city date and time from FormattedDateTime
  const updateSelectedDay = async () => {
    const formattedDateTime = await FormattedDateTime(latlong)
      .then(response => response)
      .catch(err => console.warn(err))
    if (formattedDateTime) {
      const today = dayjs(formattedDateTime).format('DD/MM/YYYY')
      const todayIndex = indexOf(weatherForecast.Days, ['date', today])
      setSelectedDayIndex(todayIndex < 0 ? 0 : todayIndex)
    }
  }

  const [selectedDayIndex, setSelectedDayIndex] = useState(-1)

  const daySelectHandler = index => {
    setSelectedDayIndex(index)
  }

  // find weather icon and desc for every day in weatherForecast Days based on the most common weather_icon of the timeframes
  const [dayIcons, setDayIcons] = useState([])
  const updateDayIcons = () => {
    const icons = GroupedDayIcons(weatherForecast, 'wx_icon')
    const iconsDesc = GroupedDayIcons(weatherForecast, 'wx_desc')
    setDayIcons({icons: [...icons], iconDesc: [...iconsDesc]})
  }

  useEffect(() => {
    updateSelectedDay()
    updateDayIcons()
    // eslint-disable-next-line
  }, [latlong])

  return (
    <Fragment>
      {selectedDayIndex !== -1 ? (
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
          <div
            className={`hidden flex-col sm:flex sm:flex-row w-full rounded sm:visible`}>
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
        </Fragment>
      ) : (
        <LoaderComponent loaderText={'Fetching weather forecast'} />
      )}
    </Fragment>
  )
}

export default ForecastContainer
