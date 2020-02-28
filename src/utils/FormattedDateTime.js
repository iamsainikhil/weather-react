import axios from 'axios'
import {isUndefined, isEmpty} from 'lodash-es'

const APP_KEY = process.env.REACT_APP_TIMEZONE_DB_API_KEY

/**
 * @param {String} latlong
 */
const FormattedDateTime = async latlong => {
  const [lat, long] = latlong.split(',')
  let formattedDateTime = ''

  // fetch formattedDateTime only when latlong is valid to avoid uneccessary API calls
  if (!isUndefined(latlong) && !isEmpty(latlong)) {
    try {
      const URL = `http://api.timezonedb.com/v2.1/get-time-zone?key=${APP_KEY}&format=json&by=position&lat=${lat}&lng=${long}`
      const {data} = await axios.get(URL)
      if (!isUndefined(data) && !isEmpty(data)) {
        formattedDateTime = data.formatted
      }
    } catch (error) {
      formattedDateTime = `${error.message} forecast data. Please try again!`
    }
  }

  return formattedDateTime
}

export default FormattedDateTime
