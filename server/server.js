/**
 * This is a simple express server, to proxy weather rquest to DarkSky API.
 */
const dotenv = require('dotenv')
const result = dotenv.config()

if (result.error) {
  throw result.error
}

console.log(result.parsed)
const express = require('express')
const axios = require('axios')
const port = 3001
const SECRET = process.env.REACT_APP_DARKSKY_API_KEY
const url_prefix = `https://api.darksky.net/forecast/${SECRET}`

// setup express server
const app = express()

/**
 * listen on client request and perform proxy client request to DarkSky forecast API
 * @param {*} req
 */
const fetchWeather = async (req, res) => {
  try {
    // Retrieve latitude and longitude from client request query and append to url_prefix
    const URL = `${url_prefix}/${req.query.latlong}`
    const response = await axios.get(URL)
    return response
  } catch (err) {
    console.log(err)
    res
      .status(err.response.status)
      .json({message: 'Error occured requesting Dark Sky API', details: err})
  }
}

app.get('/weather', function(req, res) {
  fetchWeather(req, res)
})

// start server and listen on the port
app.listen(port, () => {
  console.info('Listening on port:', port)
})
