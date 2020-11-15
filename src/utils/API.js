/**
 * weather react serverless API functions URL
 */
const isProduction = process.env.NODE_ENV === 'production'
/**
 * update the URLs to point to your Back-end project deployed URL
 * weather-react-api has access-control-origin restricted to iamsainikhil.com
 * all the requests initiated from any other domain (including localhost) will be rejected!
 */

export default isProduction
  ? 'https://weather-react-api.now.sh'
  : 'https://weather-react-api-dev.now.sh'
