import React, {Component, Fragment} from 'react'
import './HomeStyle.scss'
import AutoCompleteContainer from '../autocomplete/AutoCompleteContainer'
import WeatherContainer from './../weather/WeatherContainer'
import {AddressContextProvider} from '../../context/AddressContext'

export class HomeContainer extends Component {
  render() {
    return (
      <Fragment>
        <AddressContextProvider>
          <AutoCompleteContainer />
          <WeatherContainer />
        </AddressContextProvider>
      </Fragment>
    )
  }
}

export default HomeContainer
