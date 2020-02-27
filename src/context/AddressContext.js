import React, {Component} from 'react'
import {PropTypes} from 'prop-types'

const AddressContext = React.createContext(null)

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

  async getAddressInfo() {
    try {
      // fetch ip info to find weather data on initial page load
      const data = await fetch('https://ipapi.co/json').then(response =>
        response.json()
      )

      this.setState({
        address: {
          cityName: `${data.city}, ${data.region}, ${data.country_name}`,
          cityId: ''
        },
        latlong: `${data.latitude},${data.longitude}`
      })

      // fetch and store urban areas list in localStorage
      if (!localStorage.getItem('urban-areas')) {
        const urban_areas = await fetch(
          'https://gist.githubusercontent.com/iamsainikhil/4959bbe458ebf0c4bcbf7e24b4983c89/raw/170221bcd3d9732fec97210b9a67cd445e437481/urban_areas.json'
        ).then(response => response.json())
        localStorage.setItem('urban-areas', JSON.stringify(urban_areas))
      }
    } catch (error) {
      console.log(error)
    }
  }

  componentDidMount() {
    this.getAddressInfo()
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
