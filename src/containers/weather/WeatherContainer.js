import React, {Component, Fragment} from 'react'
import LoaderComponent from '../../components/loader/LoaderComponent'
import ForecastContainer from '../forecast/ForecastContainer'
import CurrentWeatherContainer from '../current-weather/CurrentWeatherContainer'
import WeatherContext from './../../context/WeatherContext'
import {AddressContext} from '../../context/AddressContext'
import {WeatherUnitContextProvider} from '../../context/WeatherUnitContext'

export class WeatherContainer extends Component {
  previousCityName = ''
  static contextType = AddressContext

  state = {
    weatherForecast: {},
    weatherCurrent: {},
    showLoader: false,
    errorMessage: '',
    weatherUnit: 'F',
    setWeatherUnit: this.setWeatherUnit
  }

  dateTimer = setInterval(() => {
    this.fetchWeatherData()
  }, 3600000)

  APP_ID = process.env.REACT_APP_WEATHER_UNLOCKED_APP_ID
  APP_KEY = process.env.REACT_APP_WEATHER_UNLOCKED_APP_KEY

  getURL(type) {
    return `http://api.weatherunlocked.com/api/${type}/${this.context.latlong}?app_id=${this.APP_ID}&app_key=${this.APP_KEY}`
  }

  async fetchWeatherData() {
    try {
      const URL = this.getURL('forecast')
      const data = await fetch(URL).then(response => response.json())
      this.setState({weatherForecast: data})
      this.currentWeather()
    } catch (error) {
      this.setState({errorMessage: error})
    } finally {
      this.setState({showLoader: false})
    }
  }

  async currentWeather() {
    try {
      const URL = this.getURL('current')
      const data = await fetch(URL).then(response => response.json())
      this.setState({
        weatherCurrent: data
      })
    } catch (error) {
      this.setState({errorMessage: error})
    } finally {
      this.setState({showLoader: false})
    }
  }

  async componentDidUpdate() {
    if (this.previousCityName !== this.context.address.cityName) {
      this.setState({showLoader: true})
      this.fetchWeatherData()
    }
    this.previousCityName = this.context.address.cityName
  }

  componentWillUnmount() {
    clearInterval(this.dateTimer)
  }

  render() {
    return (
      <Fragment>
        {this.state.showLoader && <LoaderComponent />}
        {Object.keys(this.state.weatherCurrent).length > 0 ? (
          <div className='flex justify-center mx-10 my-10'>
            <div className='sm:w-full md:w-5/6 xl:w-1/3 border border-gray-400 bg-white rounded-lg shadow-lg  p-4'>
              <WeatherContext.Provider
                value={{
                  weatherForecast: this.state.weatherForecast,
                  weatherCurrent: this.state.weatherCurrent
                }}>
                <WeatherUnitContextProvider>
                  <CurrentWeatherContainer />
                  <ForecastContainer />
                </WeatherUnitContextProvider>
              </WeatherContext.Provider>
            </div>
          </div>
        ) : null}
      </Fragment>
    )
  }
}

export default WeatherContainer
