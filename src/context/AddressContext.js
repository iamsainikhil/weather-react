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
