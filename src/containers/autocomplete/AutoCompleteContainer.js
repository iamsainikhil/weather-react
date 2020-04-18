import React, {Component, Fragment} from 'react'
import axios from 'axios'
import axiosRetry from 'axios-retry'
import debounce from 'lodash/debounce'
import './AutoCompleteStyle.scss'
import AddressComponent from '../../components/address/AddressComponent'
import LoaderComponent from '../../components/loader/LoaderComponent'
import ErrorComponent from '../../components/error/ErrorComponent'
import {AddressContext} from '../../context/AddressContext'
import SearchComponent from '../../components/search/SearchComponent'
import {isEmpty, isUndefined} from 'lodash-es'
import HEADERS from '../../utils/AlgoliaHeaders'
import validName from '../../utils/ValidCityName'

// Exponential back-off retry delay between requests
axiosRetry(axios, {retryDelay: axiosRetry.exponentialDelay})

class AutoCompleteContainer extends Component {
  static contextType = AddressContext
  state = {
    showCaret: false,
    showAddresses: false,
    showLoader: false,
    city: '',
    addresses: [],
    errorMessage: '',
  }

  handleError(message) {
    this.setState({errorMessage: message})
  }

  // debounced function
  debounceAddress = debounce(this.getAddresses, 1000)

  searchCity = (event) => {
    this.setState({city: event.target.value, errorMessage: ''})
    this.debounceAddress()
  }

  // fetch valid matched addresses for searched city
  async getAddresses() {
    // check for empty city value since deleting city value character by character will trigger the debounceAddress
    // city value could be empty when this function run
    // so this extra check will fix the bug of showing addresses list when there is no city name
    if (this.state.city.trim()) {
      try {
        this.setState({showLoader: true})
        const {hits} = (
          await axios.request({
            url: 'https://places-dsn.algolia.net/1/places/query',
            method: 'post',
            data: {
              query: this.state.city,
              type: 'city',
              aroundLatLng: this.context.latlong,
            },
            headers: HEADERS,
          })
        ).data

        // populate addresses and show them if matching cities exist
        if (!isEmpty(hits) && !isUndefined(hits)) {
          const results = hits.map((hit) => {
            // city value lives in default array of locale_names
            const city = `${
              hit['locale_names'].en
                ? hit['locale_names'].en[0]
                : hit['locale_names'].default[0]
            }`
            // state value lives in administrative array
            const state = `${hit.administrative ? hit.administrative[0] : ''}`
            // country value lives in country object in different languages and gran the "en" version if available or else the default version
            const country = `${
              hit.country.en ? hit.country.en : hit.country.default
            }`

            // prettier-ignore
            const cityName = `${validName(city)}${validName(state)}${validName(country, false)}`
            const {lat, lng} = hit['_geoloc']
            return {
              cityName: cityName,
              cityId: hit.objectID,
              latlong: `${lat},${lng}`,
            }
          })
          // results is an array of `address` objects with cityName, objectID, and latlong properties
          this.setState({
            addresses: results,
            showCaret: true,
            showAddresses: true,
            errorMessage: '',
          })
        } else {
          this.setState({showAddresses: false})
          this.handleError(
            'No matching cities found. Try searching with a valid city name!'
          )
        }
      } catch (error) {
        this.handleError(error.response ? error.response : '')
      } finally {
        this.setState({showLoader: false})
      }
    } else {
      this.clearState()
    }
  }

  toggleAddresses = () => {
    this.setState((prevState) => {
      return {
        showAddresses: !prevState.showAddresses,
      }
    })
  }

  setCity = async (address) => {
    if (address) {
      // set city to just have cityName excluding state and country in the search input
      // 'Herndon, Virginia, United States' -> 'Herndon'
      this.setState({
        city: address.cityName.split(',')[0],
        showAddresses: false,
      })

      this.context.updateState({
        address: address,
        latlong: address.latlong,
      })
    }
  }

  clearState() {
    this.setState({
      showCaret: false,
      showAddresses: false,
      showLoader: false,
      addresses: [],
      errorMessage: '',
    })
  }

  render() {
    return (
      <Fragment>
        <div className='flex justify-center mt-5'>
          <div className='w-full sm:w-5/6 md:w-2/3 xl:max-w-5xl'>
            <SearchComponent
              city={this.state.city}
              showCaret={this.state.showCaret}
              showAddresses={this.state.showAddresses}
              citySearch={this.searchCity}
              caretClicked={this.toggleAddresses}
            />
          </div>
        </div>
        <div className='flex justify-center'>
          <div className='w-full sm:w-5/6 md:w-2/3 xl:max-w-5xl'>
            {this.state.showLoader ? (
              <LoaderComponent />
            ) : (
              this.state.showAddresses && (
                <div className='mx-10 mt-0 border-solid border-2 border-gray-400 rounded-b-xl address-list'>
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
              <div className='flex justify-center'>
                <div className='w-5/6'>
                  <ErrorComponent
                    errorMessage={this.state.errorMessage}
                    showCloseBtn={true}
                    closeError={() => {
                      this.setState({errorMessage: ''})
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </Fragment>
    )
  }
}

export default AutoCompleteContainer
