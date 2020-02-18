import React, {Component} from 'react'
const WeatherUnitContext = React.createContext({})

class WeatherUnitContextProvider extends Component {
  setWeatherUnit = state => {
    this.setState({...state})
  }

  state = {
    weatherUnit: 'F',
    setWeatherUnit: this.setWeatherUnit
  }

  render() {
    return (
      <WeatherUnitContext.Provider value={this.state}>
        {this.props.children}
      </WeatherUnitContext.Provider>
    )
  }
}

export {WeatherUnitContext, WeatherUnitContextProvider}
