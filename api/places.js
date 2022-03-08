const axios = require('axios')

// custom HTTP headers for authenticating requests sent to Algolia places server
const HEADERS = {
  'X-Algolia-Application-Id': process.env.ALGOLIA_PLACES_APP_ID || '',
  'X-Algolia-API-Key': process.env.ALGOLIA_PLACES_API_KEY || '',
}

export default function handler(req, res) {
  const {city, latlong} = req.query
  axios
    .request({
      url: 'https://places-dsn.algolia.net/1/places/query',
      method: 'post',
      data: {
        query: city,
        type: 'city',
        aroundLatLng: latlong,
      },
      headers: HEADERS,
    })
    .then((response) => {
      const {data} = response
      res.status(200)
      res.json(data)
    })
    .catch((err) => {
      res.status(err.response ? err.response.status : 500)
      res.send(err.message || 'Something went wrong! Please try again later.')
    })
}
