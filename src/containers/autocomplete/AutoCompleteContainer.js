import React, {Component, Fragment} from 'react'
import debounce from 'lodash/debounce'
import './AutoCompleteStyle.scss'
import SearchContainer from '../../components/search/SearchComponent'
import AddressComponent from '../../components/address/AddressComponent'
import LoaderComponent from '../../components/loader/LoaderComponent'
import ErrorComponent from '../../components/error/ErrorComponent'
import {AddressContext} from '../../context/AddressContext'

class AutoCompleteContainer extends Component {
  static contextType = AddressContext
  state = {
    showCaret: false,
    showAddresses: false,
    showLoader: false,
    city: '',
    addresses: [],
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
        const results = data._embedded['city:search-results'].map(result => ({
          cityName: result.matching_full_name,
          cityId: result._links['city:item'].href.split('/')[5]
        }))
        // results is an array of `address` objects with cityName and cityId properties
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
        city: address.cityName,
        showAddresses: false
      })
      this.getLatLong(address)
    }
  }

  async getLatLong(address) {
    const data = await fetch(
      `https://api.teleport.org/api/cities/${address.cityId}`
    ).then(response => response.json())
    const {latitude, longitude} = await data.location.latlon
    let name = undefined
    if (await data._links['city:urban_area']) {
      name = await data._links['city:urban_area'].name
    }
    // update urbanArea
    if (localStorage.getItem('urban-areas') && name !== undefined) {
      const urbanAreas = JSON.parse(localStorage.getItem('urban-areas'))
      if (Object.keys(urbanAreas).includes(name)) {
        this.context.updateState({
          urbanArea: {
            name,
            slug: urbanAreas[name]
          }
        })
      }
    }
    this.context.updateState({
      address: address,
      latlong: `${latitude},${longitude}`
    })
  }

  clearState() {
    this.setState({
      showCaret: false,
      showAddresses: false,
      showLoader: false,
      addresses: [],
      errorMessage: ''
    })
  }

  render() {
    return (
      <Fragment>
        <div className='flex justify-center mt-5'>
          <div className='w-full sm:w-5/6 md:w-2/3 xl:w-1/2'>
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
          <div className='w-full sm:w-5/6 md:w-2/3 xl:w-1/2'>
            {this.state.showLoader ? (
              <LoaderComponent />
            ) : (
              this.state.showAddresses && (
                <div className='mx-6 mt-1 border-solid border-2 border-gray-400 rounded address-list'>
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
                showCloseBtn={true}
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
