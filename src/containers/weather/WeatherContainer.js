import React, {Component, Fragment} from 'react'
import InfoComponent from '../../components/weather/InfoComponent'
import InfoDetailComponent from '../../components/weather/InfoDetailComponent'
import temperatureConvert from '../../utils/TemperatureConvert'
import SpeedConvert from '../../utils/SpeedConvert'
import {startCase} from 'lodash-es'
import {getTime} from 'date-fns'

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
    try {
      const URL = this.getURL('forecast')
      this.setState({showLoader: true})
      const data = await fetch(URL).then(response => response.json())

      this.setState({weatherData: data})
      // fetch current weather
      this.currentWeather()
    } catch (error) {
      this.setState({errorMessage: error, showLoader: false})
    }
  }

  async currentWeather() {
    try {
      const URL = this.getURL('weather')
      this.setState({showLoader: true})
      const data = await fetch(URL).then(response => response.json())
      this.setState({
        currentWeather: data
      })
      const unit = JSON.parse(localStorage.getItem('unit'))
      this.infoDetailData(unit)
    } catch (error) {
      this.setState({errorMessage: error, showLoader: false})
    }
  }

  detectDayNight(sunrise, sunset) {
    const currentTime = getTime(new Date())
    if (currentTime >= sunrise && currentTime < sunset) {
      return 'd'
    }
    return 'n'
  }

  getWindDirection = deg => {
    if (deg >= 0 && deg <= 45) {
      return 'N'
    } else if (deg >= 46 && deg <= 90) {
      return 'NE'
    } else if (deg >= 91 && deg <= 135) {
      return 'E'
    } else if (deg >= 136 && deg <= 180) {
      return 'SE'
    } else if (deg >= 181 && deg <= 225) {
      return 'S'
    } else if (deg >= 226 && deg <= 270) {
      return 'SW'
    } else if (deg >= 271 && deg <= 315) {
      return 'W'
    } else {
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
        {Object.keys(this.state.currentWeather).length > 0 ? (
          <div className='flex justify-center mx-10 my-10'>
            <div className='sm:w-full lg:w-4/6 border border-gray-400 bg-white rounded-lg shadow-lg  p-4'>
              <InfoComponent
                address={this.props.address}
                currentWeatherCondition={startCase(
                  this.state.currentWeather.weather[0].description
                )}
              />
              {Object.keys(this.state.infoDetailComponentData).length > 0 ? (
                <InfoDetailComponent
                  data={this.state.infoDetailComponentData}
                  unitClicked={this.unitHandler}
                />
              ) : null}
            </div>
          </div>
        ) : null}
        {Object.keys(this.state.weatherData).length > 0
          ? this.state.weatherData.list.map((weather, index) => {
              return <p key={index}>{weather.dt_txt}</p>
            })
          : null}
      </Fragment>
    )
  }
}

export default WeatherContainer
