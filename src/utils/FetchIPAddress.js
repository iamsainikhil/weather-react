import axios from 'axios'
import * as Sentry from '@sentry/browser'

const fetchIPAddress = async () => {
  let ip = ''
  try {
    const {data} = await axios.get('https://ipapi.co/json')
    ip = data.ip
  } catch (err) {
    Sentry.captureException(err)
  }

  return ip
}

export default fetchIPAddress
