import React, {Component, Fragment} from 'react'
import './HomeStyle.scss'
import AutoCompleteContainer from '../autocomplete/AutoCompleteContainer'
import WeatherContainer from '../weather/WeatherContainer'

export class HomeContainer extends Component {
  state = {
    city: '',
    countryCode: '',
    address: ''
  }

  citySearchHandler = data => {
    this.setState({
      city: data.city,
      countryCode: data.countryCode,
      address: data.address
    })
  }

  async componentDidMount() {
    try {
      // fetch ip info to find weather data on initial page load
      const data = await fetch('https://ipapi.co/json').then(response =>
        response.json()
      )

      this.setState({
        city: data.city,
        countryCode: data.country_code,
        address: `${data.city}, ${data.region}, ${data.country}`
      })
    } catch (error) {
      console.log(error)
    }
  }
  render() {
    return (
      <Fragment>
        <div>
          <AutoCompleteContainer
            citySearch={data => this.citySearchHandler(data)}
          />
          <WeatherContainer
            city={this.state.city}
            countryCode={this.state.countryCode}
            address={this.state.address}
          />
        </div>
      </Fragment>
    )
  }
}

export default HomeContainer
