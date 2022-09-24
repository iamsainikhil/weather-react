import React, {Component, Suspense, lazy, Fragment} from 'react'
import LoaderComponent from '../../components/loader/LoaderComponent'
import {AddressContextProvider} from '../../context/AddressContext'
import {WeatherUnitContextProvider} from '../../context/WeatherUnitContext'
import {ThemeContext} from '../../context/ThemeContext'
import ErrorBoundaryContainer from '../error-boundary/ErrorBoundaryContainer'
const WeatherContainer = lazy(() => import('./../weather/WeatherContainer'))

export class HomeContainer extends Component {
  static contextType = ThemeContext

  render() {
    return (
      <Fragment>
        <WeatherUnitContextProvider>
          <AddressContextProvider>
            <ErrorBoundaryContainer>
              <Suspense
                fallback={
                  <LoaderComponent loaderText={'Loading weather forecast UI'} />
                }>
                <WeatherContainer />
              </Suspense>
            </ErrorBoundaryContainer>
          </AddressContextProvider>
        </WeatherUnitContextProvider>
      </Fragment>
    )
  }
}

export default HomeContainer
