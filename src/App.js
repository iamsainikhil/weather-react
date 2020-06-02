import React, {useContext, Suspense, lazy} from 'react'
import {Switch, Route} from 'react-router-dom'
import {ThemeContext} from './context/ThemeContext'
import HeaderComponent from './components/header/HeaderComponent'
import FooterComponent from './components/footer/FooterComponent'
import LoaderComponent from './components/loader/LoaderComponent'
import ReactGA from 'react-ga'

const HomeContainer = lazy(() => import('./containers/home/HomeContainer'))
const PrivacyPolicyComponent = lazy(() =>
  import('./components/privacy-policy/PrivacyPolicyComponent')
)

const GA_ID = process.env.REACT_APP_GA_ID

// reactGA initialization
ReactGA.initialize(`${GA_ID}`)

let deferredPrompt

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault()
  // Stash the event so it can be triggered later.
  deferredPrompt = e
  // Update UI notify the user they can install the PWA
  // Show the prompt
  deferredPrompt.prompt()
  // Wait for the user to respond to the prompt
  deferredPrompt.userChoice.then((choiceResult) => {
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the A2HS prompt')
    } else {
      console.log('User dismissed the A2HS prompt')
    }
    deferredPrompt = null
  })
})

window.addEventListener('appinstalled', (event) => {
  ReactGA.event({
    category: 'PWA Install',
    action: event,
    label: 'App installed from prompt',
  })
})

const App = () => {
  const {theme} = useContext(ThemeContext)

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
