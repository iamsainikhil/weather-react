import React, {Component, Suspense, lazy, Fragment} from 'react'
import AutoCompleteContainer from '../autocomplete/AutoCompleteContainer'
import LoaderComponent from '../../components/loader/LoaderComponent'
import {AddressContextProvider} from '../../context/AddressContext'
import {WeatherUnitContextProvider} from '../../context/WeatherUnitContext'
import {ThemeContext} from '../../context/ThemeContext'
import ErrorBoundaryContainer from '../error-boundary/ErrorBoundaryContainer'
const WeatherContainer = lazy(() => import('./../weather/WeatherContainer'))
const FavoritesContainer = lazy(() => import('../favorites/FavoritesContainer'))

export class HomeContainer extends Component {
  static contextType = ThemeContext

  render() {
    return (
      <Fragment>
        <WeatherUnitContextProvider>
          <AddressContextProvider>
            <AutoCompleteContainer />
            <ErrorBoundaryContainer>
              <Suspense
                fallback={
                  <LoaderComponent loaderText={'Loading weather forecast UI'} />
                }>
                <WeatherContainer />
                <FavoritesContainer />
              </Suspense>
            </ErrorBoundaryContainer>
          </AddressContextProvider>
        </WeatherUnitContextProvider>
      </Fragment>
    )
  }
}

export default HomeContainer
