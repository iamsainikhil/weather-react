import {isEmpty, isNil} from 'lodash-es'

/**
 * Check if the given value is valid or not
 * @param {*} value
 * @returns {Boolean}
 */
const isValid = (value) => {
  return !isEmpty(value) && !isNil(value)
}

export default isValid
