import React, {useContext, Suspense, lazy} from 'react'
import {Switch, Route} from 'react-router-dom'
import {ThemeContext} from './context/ThemeContext'
import HeaderComponent from './components/header/HeaderComponent'
import FooterComponent from './components/footer/FooterComponent'
import LoaderComponent from './components/loader/LoaderComponent'
import ReactGA from 'react-ga'

const HomeContainer = lazy(() => import('./containers/home/HomeContainer'))
// const PrivacyPolicyComponent = lazy(() =>
//   import('./components/privacy-policy/PrivacyPolicyComponent')
// )

const GA_ID = process.env.REACT_APP_GA_ID

// reactGA initialization
ReactGA.initialize(`${GA_ID}`)

const App = () => {
  const {theme} = useContext(ThemeContext)

  return (
    <div className={`bg-${theme} tracking-wider border-box wrapper`}>
      <div>
        <HeaderComponent />
      </div>
      <div>
        <Suspense
          fallback={<LoaderComponent loaderText='Loading components' />}>
          <Switch>
            <Route path='/' exact component={HomeContainer}></Route>
            {/* <Route
              path='/privacy-policy'
              exact
              component={PrivacyPolicyComponent}></Route> */}
          </Switch>
        </Suspense>
      </div>
      <div>
        <FooterComponent />
      </div>
    </div>
  )
}

export default App
