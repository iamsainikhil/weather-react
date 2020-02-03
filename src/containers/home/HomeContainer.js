import React, {Component} from 'react'
import debounce from 'lodash/debounce'
import SearchContainer from '../../components/search/SearchComponent'
import AddressComponent from '../../components/address/AddressComponent'
import './HomeStyle.scss'

class HomeContainer extends Component {
  state = {
    city: '',
    addresses: [],
    countryCode: ''
  }

  // debounced function
  debounceAddress = debounce(this.getAddresses, 1000)

  searchCity = event => {
    this.setState({city: event.target.value})
    this.debounceAddress()
  }

  // fetch valid matched addresses for searched city
  async getAddresses() {
    fetch(`https://api.teleport.org/api/cities/?search=${this.state.city}`)
      .then(response => response.json())
      .then(data => {
        const results = data._embedded['city:search-results'].map(
          result => result.matching_full_name
        )
        this.setState({addresses: results})
      })
      .catch(err => console.log(err))
      .finally(() => console.log('addresses fetched'))
  }

  setCity = address => {
    this.setState({
      city: address
    })
    this.getCountryCode()
  }

  validAddresses = () => {
    return this.state.addresses && this.state.addresses.length > 0
  }

  async getCountryCode() {
    fetch(
      'https://gist.githubusercontent.com/iamsainikhil/7d0f46a903c47efadd2d0bb4e0862c4d/raw/be41012c2c3e619396c0b66f7004b83546f51d31/iso3166_codes.json'
    )
      .then(response => response.json())
      .then(data => {
        const name = this.state.city.split(', ')[2].trim()
        let countryName = name.includes('(') ? name.split('(')[0].trim() : name
        const filteredCodes = data.filter(
          country => country.Name === countryName
        )
        this.setState({
          city: this.state.city.split(', ')[0].trim(),
          countryCode: filteredCodes[0].Code
        })
        this.fetchWeatherData()
      })
      .catch(err => console.log(err))
  }

  async fetchWeatherData() {
    const API_KEY = process.env.REACT_APP_WEATHERMAP_API
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${this.state.city},${this.state.countryCode}&appid=${API_KEY}`
    fetch(URL)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.clearState()
      })
      .catch(err => console.log(err))
      .finally(() => console.log('Weather data fetched'))
  }

  clearState() {
    this.setState({city: '', address: '', addresses: [], countryCode: ''})
  }

  render() {
    return (
      <div>
        <SearchContainer
          city={this.state.city}
          showCaret={this.validAddresses()}
          citySearch={this.searchCity}
        />
        {this.validAddresses() ? (
          <div className='flex'>
            <div className='w-1/2 mx-5 mt-1 border border-gray-600 rounded address-list'>
              {this.state.addresses.map((address, index) => {
                return (
                  <AddressComponent
                    address={address}
                    key={index}
                    addressSelected={() => this.setCity(address)}
                  />
                )
              })}
            </div>
          </div>
        ) : null}
      </div>
    )
  }
}

export default HomeContainer
