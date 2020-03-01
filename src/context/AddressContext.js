import React, {Component} from 'react'
import axios from 'axios'
import axiosRetry from 'axios-retry'
import {PropTypes} from 'prop-types'
import {isEmpty, isUndefined} from 'lodash-es'

// const token = process.env.REACT_APP_IPINFO_TOKEN
const AddressContext = React.createContext(null)

// Exponential back-off retry delay between requests
axiosRetry(axios, {retryDelay: axiosRetry.exponentialDelay})

class AddressContextProvider extends Component {
  updateState = state => {
    this.setState({...state})
  }

  updateFavorites = state => {
    this.setState({...state})
  }
  state = {
    address: {
      cityName: '',
      cityId: ''
    },
    urbanArea: {
      name: '',
      slug: '',
      photos: []
    },
    latlong: '',
    favorites: [],
    updateState: this.updateState,
    updateFavorites: this.updateFavorites
  }

  fetchAddressInfo = async () => {
    const {data} = await axios.get('https://ipapi.co/json')

    if (!isEmpty(data) && !isUndefined(data)) {
      this.updateState({
        address: {
          cityName: `${data.city}, ${data.region}, ${data.country_name}`,
          cityId: ''
        },
        latlong: `${data.latitude},${data.longitude}`
      })
    }
  }

  async getAddressInfo() {
    try {
      // use ipapi.co API instead of using browser's default geolocation API
      // since cityName is important and cannot be fetched using browser geolocation API
      this.fetchAddressInfo()

      // fetch and store urban areas list in localStorage
      if (!localStorage.getItem('urban-areas')) {
        const urban_areas = await axios
          .get(
            'https://gist.githubusercontent.com/iamsainikhil/4959bbe458ebf0c4bcbf7e24b4983c89/raw/170221bcd3d9732fec97210b9a67cd445e437481/urban_areas.json'
          )
          .then(response => response.data)
        localStorage.setItem('urban-areas', JSON.stringify(urban_areas))
      }
    } catch (error) {
      console.log(error)
    }
  }

  getFavorites = () => {
    if (localStorage.getItem('favorites')) {
      this.setState({
        favorites: [...JSON.parse(localStorage.getItem('favorites'))]
      })
    }
  }

  componentDidMount() {
    this.getAddressInfo()
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
  latlong: PropTypes.string
}
