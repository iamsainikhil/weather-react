import React, {Component} from 'react'
import {PropTypes} from 'prop-types'
import axios from 'axios'
import * as Sentry from '@sentry/browser'
import {isEmpty, isUndefined} from 'lodash-es'
import HEADERS from '../utils/AlgoliaHeaders'

// const token = process.env.REACT_APP_IPINFO_TOKEN
const AddressContext = React.createContext(null)

class AddressContextProvider extends Component {
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

  updateAddress = async (latlong) => {
    let hit = {}
    try {
      const {hits} = (
        await axios.get(
          `https://places-dsn.algolia.net/1/places/reverse?aroundLatLng=${latlong},&hitsPerPage=1&language=en`,
          {
            headers: HEADERS,
          }
        )
      ).data
      hit = hits[0]

      if (!isEmpty(hit) && !isUndefined(hit)) {
        const cityName = `${hit.city ? hit.city[0] : ''}, ${
          hit.administrative ? hit.administrative[0] : ''
        }, ${hit.country ? hit.country : ''}`
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

  getAddress = async () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const latlong = this.formatCoords(
          position.coords.latitude,
          position.coords.longitude
        )
        this.updateAddress(latlong)
      })
    } else {
      try {
        const {data} = await axios.get('https://ipapi.co/json')
        const latlong = this.formatCoords(data.latitude, data.longitude)
        this.updateAddress(latlong)
      } catch (error) {
        Sentry.captureException(error)
      }
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
