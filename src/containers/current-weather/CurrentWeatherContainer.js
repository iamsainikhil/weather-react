import React, {Fragment, useState, useEffect} from 'react'
import InfoComponent from '../../components/weather/InfoComponent'
import InfoDetailComponent from '../../components/weather/InfoDetailComponent'

const CurrentWeatherContainer = ({address, currentWeather}) => {
  const [unit, setUnit] = useState('F')

  const unitHandler = unit => {
    setUnit(unit)
    localStorage.setItem('unit', JSON.stringify(unit))
  }

  useEffect(() => {
    // store preferred temperature unit in localStorage
    if (!localStorage.getItem('unit')) {
      localStorage.setItem('unit', JSON.stringify('F'))
    } else {
      setUnit(JSON.parse(localStorage.getItem('unit')))
    }
  }, [unit])

  return (
    <Fragment>
      <InfoComponent currentWeather={currentWeather} address={address} />
      <InfoDetailComponent
        currentWeather={currentWeather}
        unit={unit}
        unitClicked={unitHandler}
      />
    </Fragment>
  )
}

export default CurrentWeatherContainer
