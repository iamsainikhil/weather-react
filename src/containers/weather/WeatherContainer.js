import React, {Component, Fragment} from 'react'
// import {getTime} from 'date-fns'
import LoaderComponent from '../../components/loader/LoaderComponent'
import ForecastContainer from '../forecast/ForecastContainer'
import CurrentWeatherContainer from '../current-weather/CurrentWeatherContainer'

export class WeatherContainer extends Component {
  state = {
    weatherData: {},
    currentWeather: {},
    showLoader: false,
    errorMessage: ''
  }

  dateTimer = setInterval(() => {
    this.fetchWeatherData()
  }, 3600000)

  APP_ID = process.env.REACT_APP_WEATHER_UNLOCKED_APP_ID
  APP_KEY = process.env.REACT_APP_WEATHER_UNLOCKED_APP_KEY

  getURL(type) {
    return `http://api.weatherunlocked.com/api/${type}/${this.props.latlong}?app_id=${this.APP_ID}&app_key=${this.APP_KEY}`
  }

  async fetchWeatherData() {
    try {
      // const URL = this.getURL('forecast')
      this.setState({showLoader: true})
      // const data = await fetch(URL).then(response => response.json())

      // this.setState({weatherData: data})
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
      this.setState({showLoader: true})
      const data = await fetch(URL).then(response => response.json())
      this.setState({
        currentWeather: data
      })
    } catch (error) {
      this.setState({errorMessage: error})
    } finally {
      this.setState({showLoader: false})
    }
  }

  // detectDayNight(sunrise, sunset) {
  //   const currentTime = getTime(new Date())
  //   if (currentTime >= sunrise && currentTime < sunset) {
  //     return 'd'
  //   }
  //   return 'n'
  // }

  componentDidUpdate(prevProps) {
    if (this.props.address !== prevProps.address) {
      if (this.props.address.cityName.length > 0) {
        this.fetchWeatherData()
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.dateTimer)
  }

  render() {
    return (
      <Fragment>
        {this.state.showLoader && <LoaderComponent />}
        {Object.keys(this.state.currentWeather).length > 0 ? (
          <div className='flex justify-center mx-10 my-10'>
            <div className='sm:w-full md:w-2/3 lg:w-5/6 xl:w-1/3 border border-gray-400 bg-white rounded-lg shadow-lg  p-4'>
              <CurrentWeatherContainer
                address={this.props.address}
                currentWeather={this.state.currentWeather}
              />
              <ForecastContainer weatherData={this.state.weatherData} />
            </div>
          </div>
        ) : null}
      </Fragment>
    )
  }
}

export default WeatherContainer
