// this URL points to the root directory of the app based on dev or prod environment
const isProduction = process.env.NODE_ENV === 'production'
export default isProduction ? '.' : './weather-react'
