const axios = require('axios')

// custom HTTP headers for authenticating requests sent to Algolia places server
const HEADERS = {
  'X-Algolia-Application-Id': process.env.ALGOLIA_PLACES_APP_ID || '',
  'X-Algolia-API-Key': process.env.ALGOLIA_PLACES_API_KEY || '',
}

export default function handler(req, res) {
  const {latlong} = req.query
  console.log(latlong)
  const url = `https://places-dsn.algolia.net/1/places/reverse?aroundLatLng=${latlong},&hitsPerPage=1&language=en`
  axios
    .get(url, {headers: HEADERS})
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
