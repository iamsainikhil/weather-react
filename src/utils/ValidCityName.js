import {isEmpty, isUndefined, isNull} from 'lodash-es'

/**
 * util func to check and return the valid name
 * @param {*} name (city or state or country)
 * @param {*} showDelimeter (false for country)
 */
const validName = (name, showDelimeter = true) => {
  return !isEmpty(name) && !isUndefined(name) && !isNull(name)
    ? `${name}${showDelimeter ? ', ' : ''}`
    : ''
}

export default validName
