import React, {Component} from 'react'
import debounce from 'lodash/debounce'
import './HomeStyle.scss'
import SearchContainer from '../../components/search/SearchComponent'
import AddressComponent from '../../components/address/AddressComponent'
import LoaderComponent from '../../components/loader/LoaderComponent'
import ErrorComponent from '../../components/error/ErrorComponent'

class HomeContainer extends Component {
  state = {
    showCaret: false,
    showAddresses: false,
    showLoader: false,
    city: '',
    addresses: [],
    countryCode: '',
    countryCodes: [],
    weatherData: {},
    errorMessage: ''
  }

  handleError(message) {
    this.setState({errorMessage: message})
  }

  // debounced function
  debounceAddress = debounce(this.getAddresses, 1000)

  searchCity = event => {
    this.setState({city: event.target.value})
    if (event.target.value.trim()) {
      this.debounceAddress()
    } else {
      this.clearState()
    }
  }

  // fetch valid matched addresses for searched city
  async getAddresses() {
    this.setState({showLoader: true})
    fetch(`https://api.teleport.org/api/cities/?search=${this.state.city}`)
      .then(response => response.json())
      .then(data => {
        // if matching cities exist
        if (data.count) {
          const results = data._embedded['city:search-results'].map(
            result => result.matching_full_name
          )
          this.setState({
            addresses: results,
            showCaret: true,
            showAddresses: true
          })
        } else {
          this.setState({showAddresses: false})
          this.handleError(
            'No matching cities found. Try searching with a valid city name!'
          )
        }
      })
      .catch(err => {
        this.handleError(err)
      })
      .finally(() => {
        this.setState({showLoader: false})
      })
  }

  toggleAddresses = () => {
    this.setState({showAddresses: !this.state.showAddresses})
  }

  setCity = address => {
    if (address) {
      this.setState({
        city: address,
        showAddresses: false
      })
      this.getCountryCode(address)
    }
  }

  async getCountryCode(address) {
    const name = address.split(', ')[2].trim()
    let countryName = name.includes('(') ? name.split('(')[0].trim() : name
    const filteredCodes = await this.state.countryCodes.filter(
      country => country.Name === countryName
    )
    this.setState({
      city: this.state.city.split(', ')[0].trim(),
      countryCode: filteredCodes[0].Code
    })
    this.fetchWeatherData()
  }

  async fetchWeatherData() {
    const API_KEY = process.env.REACT_APP_WEATHERMAP_API
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${this.state.city},${this.state.countryCode}&appid=${API_KEY}`
    this.setState({showLoader: true})
    fetch(URL)
      .then(response => response.json())
      .then(data => {
        this.clearState()
        this.setState({weatherData: data})
      })
      .catch(err => {
        this.setState({errorMessage: err, showLoader: false})
      })
  }

  clearState() {
    this.setState({
      showCaret: false,
      showAddresses: false,
      showLoader: false,
      city: '',
      address: '',
      addresses: [],
      countryCode: '',
      errorMessage: ''
    })
  }

  componentDidMount() {
    if (localStorage.getItem('countryCodes')) {
      this.setState({
        countryCodes: JSON.parse(localStorage.getItem('countryCodes'))
      })
    } else {
      fetch(
        'https://gist.githubusercontent.com/iamsainikhil/7d0f46a903c47efadd2d0bb4e0862c4d/raw/be41012c2c3e619396c0b66f7004b83546f51d31/iso3166_codes.json'
      )
        .then(response => response.json())
        .then(data => {
          this.setState({
            countryCodes: data
          })
          localStorage.setItem('countryCodes', JSON.stringify(data))
        })
        .catch(err => console.log(err))
    }
  }

  render() {
    return (
      <div>
        <SearchContainer
          city={this.state.city}
          showCaret={this.state.showCaret}
          showAddresses={this.state.showAddresses}
          citySearch={this.searchCity}
          caretClicked={this.toggleAddresses}
        />
        {this.state.showLoader ? (
          <LoaderComponent />
        ) : this.state.showAddresses ? (
          <div className='flex'>
            <div className='w-1/2 mx-5 mt-1 rounded address-list'>
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
        {this.state.errorMessage.length ? (
          <ErrorComponent
            errorMessage={this.state.errorMessage}
            closeError={() => {
              this.setState({errorMessage: ''})
            }}
          />
        ) : null}
      </div>
    )
  }
}

export default HomeContainer
