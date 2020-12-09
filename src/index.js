import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router} from 'react-router-dom'
import {ThemeContextProvider} from './context/ThemeContext'
import App from './App'
import './styles/main.css'
import * as serviceWorker from './serviceWorker'
import LogRocketSetup from './utils/LogRocketSetup'

// setup LogRocket & Sentry
LogRocketSetup()

// custom console message
console.clear()
console.log(
  `%c

lloHe   HelloH lloHelloHel  HelloH       loHell          oHello
lloHe   Hello  lloHelloHell HelloH       loHell         loHelloH
loH     ell   lloH    Hell   llo          Hel         lloH  loHe
loH     ell    loH           ll           He          llo    oHe
loH     ell    loHell        ll           He         ello    oHel
loHelloHell    loHello       ll           He         ello    oHel
loHel o ell    loHello       llo          Hel         llo    oHe
loH     ell    loH          ello    oH   oHel    ll   llo    oHe
loH     ell    loHe    ell   llo    oH    Hel    ll   lloH  loHe
lloHe   Hello  lloHell Hell HelloHelloH  loHelloHell    loHelloH
lloHe   Hello  lloHelloHell HelloHelloH  loHelloHell     oHello

%c Interested in the code behind this application? Well you're in luck - this application is open source! 
Come say hi, tell me what you're debugging, or if interested in the codebase, 
check out the repo on GitHub - https://github.com/iamsainikhil/weather-react   `,
  'font-size: 1vmin',
  'margin-bottom: 5px; line-height: 1.5'
)

// important change after recent upgrade of react-scripts to ^3.4.0
const publicURL = process.env.PUBLIC_URL ?? '/'

const app = (
  <Router basename={publicURL}>
    <ThemeContextProvider>
      <App />
    </ThemeContextProvider>
  </Router>
)

ReactDOM.render(app, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
