import axios from 'axios'
import * as Sentry from '@sentry/browser'

const fetchIPAddress = async () => {
  try {
    const {data} = await axios.get(
      'http://ip-api.com/json/?fields=status,country,countryCode,regionName,city,lat,lon,query'
    )
    return data
  } catch (err) {
    Sentry.captureException(err)
  }
}

export default fetchIPAddress
