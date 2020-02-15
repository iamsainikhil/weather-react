import React, {Component, Fragment} from 'react'
import InfoComponent from '../../components/weather/InfoComponent'
import InfoDetailComponent from '../../components/weather/InfoDetailComponent'
import temperatureConvert from '../../utils/TemperatureConvert'
import SpeedConvert from '../../utils/SpeedConvert'
import {startCase} from 'lodash-es'
import {getHours} from 'date-fns'

export class WeatherContainer extends Component {
  state = {
    weatherData: {},
    currentWeather: {},
    infoDetailComponentData: {}
  }

  dateTimer = setInterval(() => {
    this.fetchWeatherData()
  }, 600000)

  API_KEY = process.env.REACT_APP_WEATHERMAP_API

  getURL(type) {
    return `https://api.openweathermap.org/data/2.5/${type}?q=${this.props.city},${this.props.countryCode}&appid=${this.API_KEY}&units=imperial`
  }

  async fetchWeatherData() {
    const URL = this.getURL('forecast')
    this.setState({showLoader: true})
    fetch(URL)
      .then(response => response.json())
      .then(data => {
        this.setState({weatherData: data})
        // fetch current weather
        this.currentWeather()
      })
      .catch(err => {
        this.setState({errorMessage: err, showLoader: false})
      })
  }

  async currentWeather() {
    const URL = this.getURL('weather')
    this.setState({showLoader: true})
    fetch(URL)
      .then(response => response.json())
      .then(data => {
        this.setState({
          currentWeather: data
        })
        const unit = JSON.parse(localStorage.getItem('unit'))
        this.infoDetailData(unit)
      })
      .catch(err => {
        this.setState({errorMessage: err, showLoader: false})
      })
  }

  detectDayNight(sunrise, sunset) {
    const riseHour = getHours(new Date(sunrise * 1000))
    const setHour = getHours(new Date(sunset * 1000))
    const currentHour = getHours(new Date())
    switch (currentHour) {
      case currentHour >= riseHour && currentHour < setHour:
        return 'd'
      default:
        return 'n'
    }
  }

  getWindDirection = deg => {
    switch (deg) {
      case deg >= 0 && deg <= 45:
        return 'N'
      case deg >= 46 && deg <= 90:
        return 'NE'
      case deg >= 91 && deg <= 135:
        return 'E'
      case deg >= 136 && deg <= 180:
        return 'SE'
      case deg >= 181 && deg <= 225:
        return 'S'
      case deg >= 226 && deg <= 270:
        return 'SW'
      case deg >= 271 && deg <= 315:
        return 'W'
      default:
        return 'NW'
    }
  }

  infoDetailData(unit) {
    const data = this.state.currentWeather
    let temp = null
    let feelsLike = null
    let speed = null
    if (unit === 'C') {
      temp = temperatureConvert.fToC(data.main.temp)
      feelsLike = temperatureConvert.fToC(data.main.feels_like)
      speed = `${SpeedConvert.mToK(data.wind.speed)} KMPH`
    } else {
      temp = Math.floor(data.main.temp)
      feelsLike = Math.floor(data.main.feels_like)
      speed = `${Math.floor(data.wind.speed)} MPH`
    }
    this.setState({
      infoDetailComponentData: {
        main: {
          temp: temp,
          feelsLike: feelsLike,
          humidity: data.main.humidity
        },
        wind: {
          deg: this.getWindDirection(data.wind.deg),
          speed: speed
        },
        unit: unit,
        icon: {
          id: data.weather[0].id,
          suffix: this.detectDayNight(data.sys.sunrise, data.sys.sunset)
        }
      }
    })
  }

  unitHandler = unit => {
    this.infoDetailData(unit)
    localStorage.setItem('unit', JSON.stringify(unit))
  }

  componentDidMount() {
    // store preferred temperature unit in localStorage
    if (!localStorage.getItem('unit')) {
      localStorage.setItem('unit', JSON.stringify('F'))
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.address !== prevProps.address) {
      if (this.props.city.length > 0) {
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
        {Object.keys(this.state.currentWeather).length > 0 && (
          <div className='flex justify-center mx-10 my-10'>
            <div className='sm:w-full lg:w-4/6 border border-gray-400 bg-white rounded-lg shadow-lg  p-4'>
              <InfoComponent
                address={this.props.address}
                currentWeatherCondition={startCase(
                  this.state.currentWeather.weather[0].description
                )}
              />
              {Object.keys(this.state.infoDetailComponentData).length > 0 && (
                <InfoDetailComponent
                  data={this.state.infoDetailComponentData}
                  unitClicked={this.unitHandler}
                />
              )}
            </div>
          </div>
        )}
      </Fragment>
    )
  }
}

export default WeatherContainer
