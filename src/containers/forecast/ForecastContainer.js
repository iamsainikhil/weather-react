import React, {useContext, Fragment} from 'react'
import WeatherContext from './../../context/WeatherContext'
import DayComponent from '../../components/weather/DayComponent'
// import TimeframeComponent from '../../components/weather/TimeframeComponent'

const ForecastContainer = () => {
  const {weatherForecast} = useContext(WeatherContext)

  return (
    <Fragment>
      {/* <div className='flex-col sm:flex sm:flex-row'>
                    {day.Timeframes
                    ? day.Timeframes.map((timeFrame, index) => {
                        return <TimeframeComponent timeFrame={timeFrame} key={index} />
                        })
                    : null}
                </div> */}
      <div className='flex-col sm:flex sm:flex-row w-full'>
        {weatherForecast.Days
          ? weatherForecast.Days.map((day, index) => {
              return <DayComponent day={day} key={index} />
            })
          : null}
      </div>
    </Fragment>
  )
}

export default ForecastContainer
