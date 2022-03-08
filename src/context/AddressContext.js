import React, {Component} from 'react'
import {WeatherUnitContext} from './WeatherUnitContext'
import {PropTypes} from 'prop-types'
import axios from 'axios'
import validName from './../utils/ValidCityName'
import fetchIPAddress from './../utils/FetchIPAddress'
import API_URL from '../utils/API'
import isValid from '../utils/ValidityChecker'
import {isNil} from 'lodash-es'

// const token = process.env.REACT_APP_IPINFO_TOKEN
const AddressContext = React.createContext(null)

/**
 * Today, countries that use the Fahrenheit include the United States, Bahamas, Palau,
 * Belize, the Cayman Islands, the Federated States of Micronesia,
 * the Marshall Islands, and the territories such as Puerto Rico,
 * the U.S. Virgin Islands, and Guam.
 */
const SPECIAL_COUNTRY_CODES = [
  'US',
  'BS',
  'PW',
  'BZ',
  'KY',
  'FM',
  'PR',
  'VI',
  'GU',
]

class AddressContextProvider extends Component {
  // get weather unit
  static contextType = WeatherUnitContext

  updateState = (state) => {
    this.setState({...state})
  }

  updateFavorites = (state) => {
    this.setState({...state})
  }
  state = {
    showLoader: true,
    error: null,
    address: {
      cityName: '',
      cityId: '',
    },
    latlong: null,
    favorites: [],
    updateState: this.updateState,
    updateFavorites: this.updateFavorites,
  }

  formatCoords = (latitude, longitude) => {
    return `${latitude},${longitude}`
  }

  updateWeatherUnit = (countryCode) => {
    // update the weatherUnit to 'F' if the countryCode is a special country code
    if (SPECIAL_COUNTRY_CODES.includes(countryCode)) {
      this.context.updateWeatherUnit('F')
    }
  }

  returnError = () => {
    this.updateState({
      showLoader: false,
      error:
        'Failed to fetch address information for your geolocation. Please search for any city to get weather forecast!!',
    })
  }

  /**
   * update address using reverse geocoding of Algolia PLaces to obtain city, state, country, cityID
   */
  updateAddress = async (latlong) => {
    let hit = {}
    try {
      const {hits} = (await axios.get(`${API_URL}/address?latlong=${latlong}`))
        .data
      hit = hits[0]

      if (isValid(hit)) {
        const city = hit.city ? hit.city[0] : ''
        const state = hit.administrative ? hit.administrative[0] : ''
        const country = hit.country ? hit.country : ''
        const cityName = `${validName(city)}${validName(state)}${validName(
          country,
          false
        )}`
        const cityId = hit.objectID ? hit.objectID : ''
        // country_code in hit will be in lowercase
        const countryCode = hit.country_code
          ? hit.country_code.toUpperCase()
          : ''
        this.updateWeatherUnit(countryCode)
        this.updateState({
          showLoader: false,
          error: null,
          address: {
            cityName,
            cityId,
          },
          latlong,
        })
      }
    } catch (error) {
      this.returnError()
      console.error(error)
    }
  }

  /**
   * get ip and city info using ip-api
   * update the address
   */
  getIPAddress = async () => {
    try {
      const data = await fetchIPAddress()
      if (isValid(data)) {
        const {latitude, longitude, city, region, country_name, country_code} =
          data
        const cityName = `${city}, ${region}, ${country_name}`
        this.updateWeatherUnit(country_code)

        // check whether latitude and longitude are strings which are NaN as well as if value is null or undefined
        const Latitude =
          isNil(latitude) || isNaN(Number(latitude)) ? '00' : latitude
        const Longitude =
          isNil(longitude) || isNaN(Number(longitude)) ? '00' : longitude
        this.updateState({
          showLoader: false,
          error: null,
          address: {
            cityName,
          },
          latlong: this.formatCoords(Latitude, Longitude),
        })
      } else {
        this.updateState({showLoader: false, error: null})
      }
    } catch (error) {
      this.returnError()
      console.error(error)
    }
  }

  getAddress = async () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latlong = this.formatCoords(
            position.coords.latitude,
            position.coords.longitude
          )
          this.updateAddress(latlong)
        },
        (error) => {
          console.error(error)
          this.getIPAddress()
        }
      )
    } else {
      this.getIPAddress()
    }
  }

  getFavorites = () => {
    if (localStorage.getItem('favorites')) {
      this.setState({
        favorites: [...JSON.parse(localStorage.getItem('favorites'))],
      })
    }
  }

  componentDidMount() {
    this.getAddress()
    // update favorites for the initial application load
    this.getFavorites()
  }

  render() {
    return (
      <AddressContext.Provider value={this.state}>
        {this.props.children}
      </AddressContext.Provider>
    )
  }
}

export {AddressContext, AddressContextProvider}

AddressContext.propTypes = {
  address: PropTypes.objectOf(PropTypes.string),
  favorites: PropTypes.array,
  updateState: PropTypes.func,
  updateFavorites: PropTypes.func,
}
