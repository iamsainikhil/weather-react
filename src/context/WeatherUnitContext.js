import React, {useState, useEffect} from 'react'
const WeatherUnitContext = React.createContext({
  weatherUnit: 'C'
})

const WeatherUnitContextProvider = ({children}) => {
  const [weatherUnit, setWeatherUnit] = useState('C')

  /**
   * @param {String} unit (F | C)
   * @param {String} type (selectUnit | toggle)
   */
  const updateWeatherUnit = unit => {
    setWeatherUnit(unit)
    localStorage.setItem('unit', JSON.stringify(unit))
  }

  useEffect(() => {
    // store preferred temperature unit in localStorage
    if (!localStorage.getItem('unit')) {
      localStorage.setItem('unit', JSON.stringify('C'))
    } else {
      setWeatherUnit(JSON.parse(localStorage.getItem('unit')))
    }
    // eslint-disable-next-line
  }, [])

  return (
    <WeatherUnitContext.Provider value={{weatherUnit, updateWeatherUnit}}>
      {children}
    </WeatherUnitContext.Provider>
  )
}

export {WeatherUnitContext, WeatherUnitContextProvider}
