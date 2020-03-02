import {isUndefined, isEmpty} from 'lodash-es'

// check if there any image exist for an urban area
const imageExist = urbanArea => {
  return isUndefined(urbanArea.photos) && isEmpty(urbanArea.photos)
    ? false
    : urbanArea.photos.length > 0
}

/* sample urbanArea
"urbanArea": {
  "name": "Christchurch",
  "slug": "christchurch",
  "photos": [
    {
      "attribution": {
        "license": "Creative Commons Attribution-Share Alike 3.0 Unported",
        "photographer": "P. Stalder",
        "site": "Wikimedia Commons",
        "source": "https://commons.wikimedia.org/wiki/File:Christchurch_City.jpg"
      },
      "image": {
        "mobile": "https://d13k13wj6adfdf.cloudfront.net/urban_areas/christchurch-0cf7c854fe.jpg",
        "web": "https://d13k13wj6adfdf.cloudfront.net/urban_areas/christchurch_web-23e4656c2c.jpg"
      }
    }
  ]
} */
/**
 * @param {Object} urbanArea
 */
const getImageDetails = urbanArea => {
  const {image} = imageExist(urbanArea)
    ? urbanArea.photos[0]
    : {mobile: '', web: ''}
  const {photographer, site, source} = imageExist(urbanArea)
    ? urbanArea.photos[0].attribution
    : {
        photographer: '',
        site: '',
        source: ''
      }

  return {
    image,
    photographer,
    site,
    source
  }
}

export {imageExist, getImageDetails}
