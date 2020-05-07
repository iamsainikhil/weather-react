import React, {Component} from 'react'
import {WeatherUnitContext} from './WeatherUnitContext'
import {PropTypes} from 'prop-types'
import axios from 'axios'
import * as Sentry from '@sentry/browser'
import validName from './../utils/ValidCityName'
import fetchIPAddress from './../utils/FetchIPAddress'
import API_URL from '../utils/API'
import isValid from '../utils/ValidityChecker'

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
    address: {
      cityName: '',
      cityId: '',
    },
    latlong: '',
    favorites: [],
    updateState: this.updateState,
    updateFavorites: this.updateFavorites,
  }

  formatCoords = (latitude, longitude) => {
    return `${latitude},${longitude}`
  }

  /**
   * update address using reverse geocoding of Algolia PLaces to obtain city, state, country, cityID
   */
  updateAddress = async (latlong) => {
    let hit = {}
    try {
      const {hits} = (
        await axios.get(`${API_URL}/address/coords/${latlong}`)
      ).data
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
        this.updateState({
          address: {
            cityName,
            cityId,
          },
          latlong,
        })
      }
    } catch (error) {
      Sentry.captureException(error)
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
        const {lat, lon, city, regionName, country, countryCode} = data
        const cityName = `${city}, ${regionName}, ${country}`
        // update the weatherUnit to 'F' if the countryCode is a special country code
        if (SPECIAL_COUNTRY_CODES.includes(countryCode)) {
          this.context.updateWeatherUnit('F')
        }
        this.updateState({
          address: {
            cityName,
          },
          latlong: this.formatCoords(lat, lon),
        })
      }
    } catch (error) {
      Sentry.captureException(error)
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
