// custom HTTP headers for authenticating requests sent to Algolia places server

const HEADERS = {
  'X-Algolia-Application-Id': process.env.ALGOLIA_PLACES_APP_ID || '',
  'X-Algolia-API-Key': process.env.ALGOLIA_PLACES_API_KEY || '',
}

export default HEADERS
