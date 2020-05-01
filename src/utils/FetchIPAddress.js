import axios from 'axios'
import * as Sentry from '@sentry/browser'
import API_URL from './API'

const fetchIPAddress = async () => {
  try {
    const {data} = (await axios.get(`${API_URL}/ipinfo`)).data
    return data
  } catch (err) {
    Sentry.captureException(err)
  }

  return
}

export default fetchIPAddress
