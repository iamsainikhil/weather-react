import React, {Component, Fragment} from 'react'
import debounce from 'lodash/debounce'
import './AutoCompleteStyle.scss'
import SearchContainer from '../../components/search/SearchComponent'
import AddressComponent from '../../components/address/AddressComponent'
import LoaderComponent from '../../components/loader/LoaderComponent'
import ErrorComponent from '../../components/error/ErrorComponent'

class AutoCompleteContainer extends Component {
  state = {
    showCaret: false,
    showAddresses: false,
    showLoader: false,
    city: '',
    addresses: [],
    countryCodes: [],
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
      this.setState({errorMessage: ''})
      this.debounceAddress()
    } else {
      this.clearState()
    }
  }

  // fetch valid matched addresses for searched city
  async getAddresses() {
    try {
      this.setState({showLoader: true})
      const data = await fetch(
        `https://api.teleport.org/api/cities/?search=${this.state.city}`
      ).then(response => response.json())

      // if matching cities exist
      if (data.count) {
        const results = data._embedded['city:search-results'].map(
          result => result.matching_full_name
        )
        this.setState({
          addresses: results,
          showCaret: true,
          showAddresses: true,
          errorMessage: ''
        })
      } else {
        this.setState({showAddresses: false})
        this.handleError(
          'No matching cities found. Try searching with a valid city name!'
        )
      }
    } catch (error) {
      this.handleError(error)
    } finally {
      this.setState({showLoader: false})
    }
  }

  toggleAddresses = () => {
    this.setState((prevState, props) => {
      return {
        showAddresses: !prevState.showAddresses
      }
    })
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
    const cityName = address.split(', ')[0].trim()
    let countryName = name.includes('(') ? name.split('(')[0].trim() : name
    const filteredCodes = await this.state.countryCodes.filter(
      country => country.Name === countryName
    )
    const countryCode = filteredCodes[0].Code
    // send props to weather container through home container
    this.props.citySearch({
      city: cityName,
      countryCode: countryCode,
      address: address
    })
  }

  clearState() {
    this.setState({
      showCaret: false,
      showAddresses: false,
      showLoader: false,
      // city: '',
      address: '',
      addresses: [],
      errorMessage: ''
    })
  }

  async componentDidMount() {
    try {
      if (localStorage.getItem('countryCodes')) {
        this.setState({
          countryCodes: JSON.parse(localStorage.getItem('countryCodes'))
        })
      } else {
        const data = await fetch(
          'https://gist.githubusercontent.com/iamsainikhil/7d0f46a903c47efadd2d0bb4e0862c4d/raw/be41012c2c3e619396c0b66f7004b83546f51d31/iso3166_codes.json'
        ).then(response => response.json())

        this.setState({
          countryCodes: data
        })
        localStorage.setItem('countryCodes', JSON.stringify(data))
      }
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <Fragment>
        <div className='flex justify-center mt-5'>
          <div className='w-1/2'>
            <SearchContainer
              city={this.state.city}
              showCaret={this.state.showCaret}
              showAddresses={this.state.showAddresses}
              citySearch={this.searchCity}
              caretClicked={this.toggleAddresses}
            />
          </div>
        </div>
        <div className='flex justify-center'>
          <div className='w-1/2'>
            {this.state.showLoader ? (
              <LoaderComponent />
            ) : (
              this.state.showAddresses && (
                <div className='mx-5 mt-1 border-solid border-2 border-gray-400 rounded address-list'>
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
              )
            )}
            {this.state.errorMessage.length > 0 && (
              <ErrorComponent
                errorMessage={this.state.errorMessage}
                closeError={() => {
                  this.setState({errorMessage: ''})
                }}
              />
            )}
          </div>
        </div>
      </Fragment>
    )
  }
}

export default AutoCompleteContainer
