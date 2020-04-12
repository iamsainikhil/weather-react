import axios from 'axios'

const fetchIPAddress = async () => {
  let ip = ''
  try {
    const {data} = await axios.get('https://ipapi.co/json')
    ip = data.ip
  } catch (err) {
    console.error(err)
  }

  return ip
}

export default fetchIPAddress
