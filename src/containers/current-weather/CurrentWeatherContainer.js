import React, {Fragment, useEffect, useContext} from 'react'
import InfoComponent from '../../components/weather/InfoComponent'
import InfoDetailComponent from '../../components/weather/InfoDetailComponent'
import {WeatherUnitContext} from '../../context/WeatherUnitContext'

const CurrentWeatherContainer = () => {
  const {weatherUnit, setWeatherUnit} = useContext(WeatherUnitContext)

  const unitHandler = unit => {
    setWeatherUnit({weatherUnit: unit, setWeatherUnit})
    localStorage.setItem('unit', JSON.stringify(unit))
  }

  useEffect(() => {
    // store preferred temperature unit in localStorage
    if (!localStorage.getItem('unit')) {
      localStorage.setItem('unit', JSON.stringify('F'))
    } else {
      setWeatherUnit({
        weatherUnit: JSON.parse(localStorage.getItem('unit')),
        setWeatherUnit
      })
    }
    // eslint-disable-next-line
  }, [weatherUnit])

  return (
    <Fragment>
      <InfoComponent />
      <InfoDetailComponent unitClicked={unitHandler} />
    </Fragment>
  )
}

export default CurrentWeatherContainer
