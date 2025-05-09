/**
 * check if the value lies within the given min and max range
 * @param {Number} min
 * @param {Number} max
 * @param {Number} value iconId
 * @returns
 */
const IsWithinRange = (min, max, value) => {
  return min <= value && value <= max;
}

export default IsWithinRange;