const getWeatherIcon = code => {
  if (code) {
    switch (code) {
      case 'day-sunny':
        return 'clear-day'
      case 'night-clear':
        return 'clear-night'
      case 'rain':
        return 'rain'
      case 'snow':
        return 'snow'
      case 'sleet':
        return 'sleet'
      case 'strong-wind':
        return 'wind'
      case 'fog':
        return 'fog'
      case 'cloudy':
        return 'cloudy'
      case 'day-cloudy':
        return 'partly-cloudy-day'
      case 'night-cloudy':
        return 'partly-cloudy-night'
      case 'hail':
        return 'hail'
      case 'thunderstorm':
        return 'thunderstorm'
      case 'tornado':
        return 'tornado'
      default:
        return 'na'
    }
  }
  return 'na'
}

export default getWeatherIcon
