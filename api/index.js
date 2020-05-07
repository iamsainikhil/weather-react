const express = require('express')
const axios = require('axios')
const port = process.env.PORT || 3001

// Configure app to use bodyParser to parse json data
const app = express()

const server = require('http').createServer(app)
require('dotenv').config()

// custom HTTP headers for authenticating requests sent to Algolia places server
const HEADERS = {
  'X-Algolia-Application-Id': process.env.ALGOLIA_PLACES_APP_ID || '',
  'X-Algolia-API-Key': process.env.ALGOLIA_PLACES_API_KEY || '',
}
const DARKSKY_API_KEY = process.env.DARKSKY_API_KEY

// Test server is working (GET http://localhost:3001/)
app.get('/', function (req, res) {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Weather React API</title>
    </head>
    <body>
      <h1>Welcome to <a href="https://iamsainikhil.github.io/weather-react" target="_blank" rel="noreferrer noopener">Weather React</a> application's proxy server</h1>
    </body>
    </html>
  `)
})

// Fetch address based on latlong
app.get('/address/coords/:latlong', (req, res) => {
  const {latlong} = req.params
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
})

// Fetch weather forecast based on latlong
app.get('/forecast/coords/:latlong', (req, res) => {
  const {latlong} = req.params
  const url = `https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${latlong}?extend=hourly&exclude=minutely,flags`
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
})

// Fetch address list based on query
app.get('/places/query/:city/:latlong', (req, res) => {
  const {city, latlong} = req.params
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
})

// Start the server
server.listen(port)
console.log('Server is listening on port ' + port)
