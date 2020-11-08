import isValid from '../utils/ValidityChecker'

describe('isValid util functionality test for ValidCityName', () => {
  /* invalid test cases */
  test('any number should be invalid', () => {
    expect(isValid(1)).toBe(false)
  })
  test('an empty string should be invalid', () => {
    expect(isValid('')).toBe(false)
  })
  test('an empty object should be invalid', () => {
    expect(isValid({})).toBe(false)
  })
  test('an empty array should be invalid', () => {
    expect(isValid([])).toBe(false)
  })
  test('null should be invalid', () => {
    expect(isValid(null)).toBe(false)
  })
  test('undefined should be invalid', () => {
    expect(isValid(undefined)).toBe(false)
  })
  test('NaN should be invalid', () => {
    expect(isValid(NaN)).toBe(false)
  })

  /* valid test cases */
  test('non-empty string should be valid', () => {
    expect(isValid('value')).toBe(true)
  })
  test('non-empty object should be valid', () => {
    expect(isValid({key: 'value'})).toBe(true)
  })
  test('non-empty array should be valid', () => {
    expect(isValid([{key: 'value'}, 1, '2'])).toBe(true)
  })
})
