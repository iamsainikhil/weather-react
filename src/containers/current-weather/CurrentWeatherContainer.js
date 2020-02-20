import React, {Fragment, useEffect, useContext} from 'react'
import InfoComponent from '../../components/weather/InfoComponent'
import InfoDetailComponent from '../../components/weather/InfoDetailComponent'
import {WeatherUnitContext} from '../../context/WeatherUnitContext'
import LoaderComponent from './../../components/loader/LoaderComponent'

const CurrentWeatherContainer = ({weatherCurrent, address, latlong}) => {
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
      {address && weatherCurrent ? (
        <Fragment>
          <InfoComponent address={address} latlong={latlong} />
          <InfoDetailComponent
            weatherCurrent={weatherCurrent}
            unitClicked={unitHandler}
          />
        </Fragment>
      ) : (
        <LoaderComponent />
      )}
    </Fragment>
  )
}

export default CurrentWeatherContainer
