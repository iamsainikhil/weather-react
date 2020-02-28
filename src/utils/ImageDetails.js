import {isUndefined, isEmpty} from 'lodash-es'

// check if there any image exist for an urban area
const imageExist = urbanArea => {
  return isUndefined(urbanArea) && isEmpty(urbanArea)
    ? false
    : urbanArea.photos.length > 0
}

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
