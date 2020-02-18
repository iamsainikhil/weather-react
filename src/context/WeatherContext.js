import React from 'react'
import PropTypes from 'prop-types'

const WeatherContext = React.createContext({
  weatherForecast: {},
  weatherCurrent: {}
})

export default WeatherContext

WeatherContext.propTypes = {
  weatherForecast: PropTypes.object,
  weatherCurrent: PropTypes.object
}
