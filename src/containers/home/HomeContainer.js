import React, {Component, Fragment, Suspense, lazy} from 'react'
import './HomeStyle.scss'
import AutoCompleteContainer from '../autocomplete/AutoCompleteContainer'
import LoaderComponent from '../../components/loader/LoaderComponent'
import {AddressContextProvider} from '../../context/AddressContext'
import {WeatherUnitContextProvider} from '../../context/WeatherUnitContext'
const WeatherContainer = lazy(() => import('./../weather/WeatherContainer'))
const FavoritesContainer = lazy(() => import('../favorites/FavoritesContainer'))

export class HomeContainer extends Component {
  render() {
    return (
      <Fragment>
        <AddressContextProvider>
          <AutoCompleteContainer />
          <WeatherUnitContextProvider>
            <Suspense fallback={<LoaderComponent />}>
              <WeatherContainer />
              <FavoritesContainer />
            </Suspense>
          </WeatherUnitContextProvider>
        </AddressContextProvider>
      </Fragment>
    )
  }
}

export default HomeContainer
