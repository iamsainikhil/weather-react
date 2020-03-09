import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router} from 'react-router-dom'
import './styles/main.css'
import * as Sentry from '@sentry/browser'
import App from './App'
import * as serviceWorker from './serviceWorker'
import {ThemeContextProvider} from './context/ThemeContext'

const SENTRY_DSN = process.env.REACT_APP_SENTRY_DSN

Sentry.init({dsn: `${SENTRY_DSN}`})

const app = (
  <Router basename={process.env.PUBLIC_URL}>
    <ThemeContextProvider>
      <App />
    </ThemeContextProvider>
  </Router>
)

ReactDOM.render(app, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
