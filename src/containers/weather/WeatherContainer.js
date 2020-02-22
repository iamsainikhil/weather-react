import React, {Component, Fragment} from 'react'
import ForecastContainer from '../forecast/ForecastContainer'
import CurrentWeatherContainer from '../current-weather/CurrentWeatherContainer'
import {AddressContext} from '../../context/AddressContext'
import FetchWeatherData from '../../utils/FetchWeatherData'

export class WeatherContainer extends Component {
  previousCityName = ''
  static contextType = AddressContext

  state = {
    weatherForecast: {},
    weatherCurrent: {}
  }

  timer = null

  async fetchWeatherData() {
    const {weatherCurrent, weatherForecast} = await FetchWeatherData(
      this.context
    )
    this.setState({
      weatherCurrent,
      weatherForecast
    })
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.fetchWeatherData()
    }, 3600000)
  }

  async componentDidUpdate() {
    if (this.previousCityName !== this.context.address.cityName) {
      this.fetchWeatherData()
    }
    this.previousCityName = this.context.address.cityName
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    return (
      <Fragment>
        {this.state.weatherCurrent !== undefined &&
        Object.keys(this.state.weatherCurrent).length > 0 ? (
          <div className='flex justify-center mx-10 my-10'>
            <div className='sm:w-full md:w-5/6 lg:w-2/3 xl:w-1/2 border border-gray-400 bg-white rounded-lg shadow-lg'>
              <CurrentWeatherContainer
                weatherCurrent={this.state.weatherCurrent}
                address={this.context.address}
                latlong={this.context.latlong}
              />
              <ForecastContainer
                weatherForecast={this.state.weatherForecast}
                latlong={this.context.latlong}
              />
            </div>
          </div>
        ) : null}
      </Fragment>
    )
  }
}

export default WeatherContainer
