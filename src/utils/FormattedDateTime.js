const APP_KEY = process.env.REACT_APP_TIMEZONE_DB_API_KEY

/**
 * @param {String} latlong
 */
const FormattedDateTime = async latlong => {
  const [lat, long] = latlong.split(',')
  let formattedDateTime = ''

  try {
    const URL = `http://api.timezonedb.com/v2.1/get-time-zone?key=${APP_KEY}&format=json&by=position&lat=${lat}&lng=${long}`
    const {formatted} = await fetch(URL).then(response => response.json())
    if (formatted) {
      formattedDateTime = formatted
    }
  } catch (error) {
    formattedDateTime = `${error.message} forecast data. Please try again!`
  }

  return formattedDateTime
}

export default FormattedDateTime
