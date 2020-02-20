import dayjs from 'dayjs'
const APP_KEY = process.env.REACT_APP_TIMEZONE_DB_API_KEY

const FetchDateTime = async latlong => {
  const [lat, long] = latlong.split(',')
  let date = ''
  let time = ''

  try {
    const URL = `http://api.timezonedb.com/v2.1/get-time-zone?key=${APP_KEY}&format=json&by=position&lat=${lat}&lng=${long}`
    const {formatted} = await fetch(URL).then(response => response.json())
    if (formatted) {
      const dateObj = dayjs(formatted)
      date = dateObj.format('MMMM DD, YYYY')
      time = dateObj.format('dddd h:mm A')
    }
  } catch (error) {
    console.log(error)
  }

  return {
    date,
    time
  }
}

export default FetchDateTime
