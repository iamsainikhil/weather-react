import React, {useContext, Suspense, lazy} from 'react'
import {Switch, Route} from 'react-router-dom'
import ReactGA from 'react-ga'
import {ThemeContext} from './context/ThemeContext'
import HeaderComponent from './components/header/HeaderComponent'
import FooterComponent from './components/footer/FooterComponent'
import LoaderComponent from './components/loader/LoaderComponent'
import {Timing} from './utils/ReactAnalytics'
const HomeContainer = lazy(() => import('./containers/home/HomeContainer'))
const PrivacyPolicyComponent = lazy(() =>
  import('./components/privacy-policy/PrivacyPolicyComponent')
)

// reactGA initialization
ReactGA.initialize('UA-85329633-7')

const App = () => {
  const {theme} = useContext(ThemeContext)

  const callback = list => {
    list.getEntries().forEach(entry => {
      Timing({
        variable: 'Sever Latency',
        value: entry.responseStart - entry.requestStart,
        label: 'navigation'
      })
      Timing({
        variable: 'Download Time',
        value: entry.responseEnd - entry.responseStart,
        label: 'navigation'
      })
      Timing({
        variable: 'Total App Load Time',
        value: entry.responseEnd - entry.requestStart,
        label: 'navigation'
      })
    })
  }

  let observer = new PerformanceObserver(callback)
  observer.observe({entryTypes: ['navigation']})

  return (
    <div className={` bg-${theme} tracking-wider border-box wrapper`}>
      <div>
        <HeaderComponent />
      </div>
      <div>
        <Suspense
          fallback={<LoaderComponent loaderText='Loading components' />}>
          <Switch>
            <Route path='/' exact component={HomeContainer}></Route>
            <Route
              path='/privacy-policy'
              exact
              component={PrivacyPolicyComponent}></Route>
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
