import axios from 'axios'
import axiosRetry from 'axios-retry'
import {isEmpty, isUndefined} from 'lodash-es'
import * as Sentry from '@sentry/browser'
// Exponential back-off retry delay between requests
axiosRetry(axios, {retryDelay: axiosRetry.exponentialDelay})

/**
 * address is an object with cityName & cityId properties
 * @param {Object} address
 */
const getLatLongUrbanArea = async cityId => {
  // defaults
  let lat = ''
  let long = ''
  let name = ''
  let slug = ''
  let photos = []

  // get lat, long, and name
  await axios
    .get(`https://api.teleport.org/api/cities/${cityId}`)
    .then(async response => {
      const {data} = response
      if (!isEmpty(data) && !isUndefined(data)) {
        const {latitude, longitude} = data.location.latlon
        lat = latitude
        long = longitude
        if (data._links['city:urban_area']) {
          name = data._links['city:urban_area'].name
        }
      }

      // get slug and photos
      if (localStorage.getItem('urban-areas') && name !== undefined) {
        const urbanAreas = JSON.parse(localStorage.getItem('urban-areas'))
        // get the value of the slug with the matched name in urbanAreas array
        // i.e [{Washington, D.C.: "washington-dc"},...]
        if (Object.keys(urbanAreas).includes(name)) {
          slug = urbanAreas[name]
          const {data} = await axios.get(
            `https://api.teleport.org/api/urban_areas/slug:${slug}/images`
          )
          photos = !isEmpty(data) && !isUndefined(data) ? data.photos : []
        }
      }
    })
    .catch(err => Sentry.captureException(err))

  return {
    latlong: `${lat},${long}`,
    urbanArea: {
      name,
      slug,
      photos
    }
  }
}

export default getLatLongUrbanArea
