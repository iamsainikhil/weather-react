import axios from 'axios'

const fetchIPAddress = async () => {
  try {
    const {data} = await axios.get('https://ipapi.co/json')
    return data
  } catch (err) {
    console.error(err)
  }
}

export default fetchIPAddress
