import React, {Component, Suspense, lazy} from 'react'
import AutoCompleteContainer from '../autocomplete/AutoCompleteContainer'
import LoaderComponent from '../../components/loader/LoaderComponent'
import {AddressContextProvider} from '../../context/AddressContext'
import {WeatherUnitContextProvider} from '../../context/WeatherUnitContext'
import {ThemeContext} from '../../context/ThemeContext'
import HeaderComponent from '../../components/header/HeaderComponent'
import ErrorBoundaryContainer from '../error-boundary/ErrorBoundaryContainer'
import FooterComponent from '../../components/footer/FooterComponent'
const WeatherContainer = lazy(() => import('./../weather/WeatherContainer'))
const FavoritesContainer = lazy(() => import('../favorites/FavoritesContainer'))

export class HomeContainer extends Component {
  static contextType = ThemeContext

  render() {
    return (
      <div className='wrapper'>
        <WeatherUnitContextProvider>
          <div>
            <HeaderComponent />
          </div>
          <div>
            <AddressContextProvider>
              <AutoCompleteContainer />
              <ErrorBoundaryContainer>
                <Suspense
                  fallback={
                    <LoaderComponent loaderText={'Loading components'} />
                  }>
                  <WeatherContainer />
                  <FavoritesContainer />
                </Suspense>
              </ErrorBoundaryContainer>
            </AddressContextProvider>
          </div>
          <div>
            <FooterComponent />
          </div>
        </WeatherUnitContextProvider>
      </div>
    )
  }
}

export default HomeContainer
