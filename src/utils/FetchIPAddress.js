import axios from 'axios'
import * as Sentry from '@sentry/browser'
import API_URL from './API'

const fetchIPAddress = async () => {
  try {
    const {data} = await axios.get(`${API_URL}/ipinfo`)
    return data
  } catch (err) {
    Sentry.captureException(err)
  }
}

export default fetchIPAddress
