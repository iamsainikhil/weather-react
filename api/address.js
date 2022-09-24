const axios = require('axios')

const API_KEY = process.env.OPENWEATHER_API_KEY

export default function handler(req, res) {
  const {latlong} = req.query
  const [lat, long] = latlong ? latlong.split(',') : [0, 0]
  const url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&limit=1&appid=${API_KEY}`
  axios
    .get(url)
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
