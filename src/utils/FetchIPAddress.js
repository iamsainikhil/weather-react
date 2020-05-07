import axios from 'axios'
import * as Sentry from '@sentry/browser'

const fetchIPAddress = async () => {
  try {
    const {data} = await axios.get('https://ipapi.co/json')
    return data
  } catch (err) {
    Sentry.captureException(err)
  }
}

export default fetchIPAddress
