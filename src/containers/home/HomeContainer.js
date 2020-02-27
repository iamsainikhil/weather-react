import React, {Component, Suspense, lazy} from 'react'
import './HomeStyle.scss'
import AutoCompleteContainer from '../autocomplete/AutoCompleteContainer'
import LoaderComponent from '../../components/loader/LoaderComponent'
import {AddressContextProvider} from '../../context/AddressContext'
import {WeatherUnitContextProvider} from '../../context/WeatherUnitContext'
import {ThemeContext} from '../../context/ThemeContext'
import HeaderComponent from '../../components/header/HeaderComponent'
import WeatherContainer from './../weather/WeatherContainer'
const FavoritesContainer = lazy(() => import('../favorites/FavoritesContainer'))

export class HomeContainer extends Component {
  static contextType = ThemeContext
  render() {
    return (
      <div
        className={`bg-${this.context.theme} absolute top-0 right-0 bottom-0 left-0 tracking-wide`}>
        <WeatherUnitContextProvider>
          <HeaderComponent />
          <AddressContextProvider>
            <AutoCompleteContainer />
            <WeatherContainer />
            <Suspense fallback={<LoaderComponent />}>
              <FavoritesContainer />
            </Suspense>
          </AddressContextProvider>
        </WeatherUnitContextProvider>
      </div>
    )
  }
}

export default HomeContainer
