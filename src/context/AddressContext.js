import React, {Component} from 'react'
import axios from 'axios'
import axiosRetry from 'axios-retry'
import {PropTypes} from 'prop-types'
import {isEmpty, isUndefined} from 'lodash-es'
import getLatLongUrbanArea from '../utils/LatLongUrbanArea'

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
    // defaults
    let cityId = ''
    let urbanAreaInfo = {
      name: '',
      slug: '',
      photos: []
    }
    const {data} = await axios.get('https://ipapi.co/json')

    if (!isEmpty(data) && !isUndefined(data)) {
      const cityName = `${data.city}, ${data.region}, ${data.country_name}`
      const cityInfo = await axios
        .get(`https://api.teleport.org/api/cities/?search=${cityName}`)
        .then(response => response.data)

      // get cityId if matching cities exist
      if (!isEmpty(cityInfo) && !isUndefined(cityInfo) && cityInfo.count > 0) {
        const cityIdArr = cityInfo._embedded['city:search-results'].map(
          result => ({
            cityId: result._links['city:item'].href.split('/')[5]
          })
        )

        cityId = cityIdArr[0].cityId

        // update urbanArea with the known cityId
        const {urbanArea} = await getLatLongUrbanArea(cityId)
        urbanAreaInfo = urbanArea
      }

      this.updateState({
        address: {
          cityName: cityName,
          cityId: cityId
        },
        latlong: `${data.latitude},${data.longitude}`,
        urbanArea: urbanAreaInfo
      })
    }
  }

  async getAddressInfo() {
    try {
      // fetch and store urban areas list in localStorage
      if (!localStorage.getItem('urban-areas')) {
        const urban_areas = await axios
          .get(
            'https://gist.githubusercontent.com/iamsainikhil/4959bbe458ebf0c4bcbf7e24b4983c89/raw/170221bcd3d9732fec97210b9a67cd445e437481/urban_areas.json'
          )
          .then(response => response.data)
        localStorage.setItem('urban-areas', JSON.stringify(urban_areas))
      }

      // use ipapi.co API instead of using browser's default geolocation API
      // since cityName is important and cannot be fetched using browser geolocation API
      this.fetchAddressInfo()
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
