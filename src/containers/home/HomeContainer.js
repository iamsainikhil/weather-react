import React, {Component, Fragment} from 'react'
import './HomeStyle.scss'
import AutoCompleteContainer from '../autocomplete/AutoCompleteContainer'
import {WeatherContainer} from './../weather/WeatherContainer'

export class HomeContainer extends Component {
  state = {
    address: {
      cityName: '',
      cityId: ''
    },
    latlong: ''
  }

  citySearchHandler = data => {
    this.setState({
      address: data.address,
      latlong: data.latlong
    })
  }

  async componentDidMount() {
    try {
      // fetch ip info to find weather data on initial page load
      const data = await fetch('https://ipapi.co/json').then(response =>
        response.json()
      )

      this.setState({
        address: {
          cityName: `${data.city}, ${data.region}, ${data.country_name}`,
          cityId: ''
        },
        latlong: `${data.latitude},${data.longitude}`
      })
    } catch (error) {
      console.log(error)
    }
  }
  render() {
    return (
      <Fragment>
        <AutoCompleteContainer
          citySearch={data => this.citySearchHandler(data)}
        />
        <WeatherContainer
          address={this.state.address}
          latlong={this.state.latlong}
        />
      </Fragment>
    )
  }
}

export default HomeContainer
