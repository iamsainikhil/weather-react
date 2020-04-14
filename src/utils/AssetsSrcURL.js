// this URL points to the root directory of the app
const publicUrl = process.env.PUBLIC_URL ?? '/'
export default publicUrl === '/' ? './' : './weather-react'
