import {Event} from './ReactAnalytics'

/**
 * @param {String} type
 * @param {String} value
 */
const emitGA = (type, value) => {
  switch (type) {
    case 'favorites':
      // track selectedFavorite to GA
      Event({
        category: 'Favorites',
        action: 'Select Favorite',
        label: value
      })
      break
    case 'explore-life':
      // track explore life click event to GA
      Event({
        category: 'Explore Life',
        action: 'Click on Explore Life',
        label: value
      })
      break
    case 'powered-by':
      // track explore life click event to GA
      Event({
        category: 'Powered By',
        action: 'Click on Powered By',
        label: value
      })
      break
    default:
      break
  }
}

export default emitGA
