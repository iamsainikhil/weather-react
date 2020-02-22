import React, {Component, Fragment} from 'react'
import ForecastContainer from '../forecast/ForecastContainer'
import CurrentWeatherContainer from '../current-weather/CurrentWeatherContainer'
import {AddressContext} from '../../context/AddressContext'
import FetchWeatherData from '../../utils/FetchWeatherData'
import FormattedDateTime from './../../utils/FormattedDateTime'

export class WeatherContainer extends Component {
  previousCityName = ''
  static contextType = AddressContext

  state = {
    weatherForecast: {},
    weatherCurrent: {},
    formattedDateTime: ''
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
    const formattedString = await FormattedDateTime(this.context.latlong)
    this.setState({
      formattedDateTime: formattedString
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
          <div className='flex justify-center mx-5 my-10'>
            <div className='sm:w-full md:w-5/6 xl:w-1/2 border border-gray-400 bg-white rounded-lg shadow-lg'>
              <CurrentWeatherContainer
                weatherCurrent={this.state.weatherCurrent}
                address={this.context.address}
                latlong={this.context.latlong}
                formattedDateTime={this.state.formattedDateTime}
              />
              <ForecastContainer
                weatherForecast={this.state.weatherForecast}
                formattedDateTime={this.state.formattedDateTime}
              />
            </div>
          </div>
        ) : null}
      </Fragment>
    )
  }
}

export default WeatherContainer
