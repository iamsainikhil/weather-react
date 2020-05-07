import LogRocket from 'logrocket'
import setupLogRocketReact from 'logrocket-react'
import * as Sentry from '@sentry/browser'
import {isUndefined} from 'lodash-es'
import fetchIPAddress from './FetchIPAddress'

const SENTRY_DSN = process.env.REACT_APP_SENTRY_DSN
Sentry.init({dsn: `${SENTRY_DSN}`})

// init logrocket sessions only in the prod env and on unignored ip
const initLogRocket = () => {
  const LOGROCKET_PROJECT_ID = process.env.REACT_APP_LOGROCKET_PROJECT_ID
  LogRocket.init(`${LOGROCKET_PROJECT_ID}`)
  setupLogRocketReact(LogRocket)

  // LogRocket and Sentry
  LogRocket.getSessionURL((sessionURL) => {
    Sentry.configureScope((scope) => {
      scope.setExtra('sessionURL', sessionURL)
    })
  })
}

const logRocketSetup = async () => {
  const ipaddresses = process.env.REACT_APP_IGNORE_IP
  // check if ignore ip env variable exist
  if (!isUndefined(ipaddresses)) {
    // fetch ip address (query) and check if it matches any one of the ipaddresses
    // initLogRocket when ip is not in the ignore list or ip fetch fail
    try {
      const {query} = await fetchIPAddress()
      if (
        !isUndefined(query) &&
        !ipaddresses.split(',').includes(query) &&
        process.env.NODE_ENV !== 'development'
      ) {
        initLogRocket()
      }
    } catch (error) {
      initLogRocket()
    }
  } else {
    initLogRocket()
  }
}

export default logRocketSetup
