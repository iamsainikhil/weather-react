import getWeatherBackground from './../utils/WeatherBackground'

const timezone = 'America/New_York'
const date = new Date()

describe('getWeatherBackground util functionality test', () => {
  describe('clear-day scenario', () => {
    test('show normal background when currentTime is not 1hr less than or equal to sunrise or sunset', () => {
      const data = {
        icon: 'clear-day',
        sunrise: 1604836020,
        sunset: 1604872980,
      }
      expect(getWeatherBackground({timezone, ...data})).toBe('clear-day')
    })
    test('show dawn background is currentTime is 1hr less than or equal to sunrise', () => {
      const currentTime = Math.round(date.getTime() / 1000)
      const data = {
        icon: 'clear-day',
        sunrise: currentTime,
        sunset: 1604872980,
      }
      expect(getWeatherBackground({timezone, ...data})).toBe('dawn')
    })
    test('show dusk background is currentTime is 1hr less than or equal to sunset', () => {
      const currentTime = Math.round(date.getTime() / 1000)
      const data = {
        icon: 'clear-day',
        sunrise: 1604836020,
        sunset: currentTime,
      }
      expect(getWeatherBackground({timezone, ...data})).toBe('dusk')
    })
  })

  describe('clear-night scenario', () => {
    test('show normal background when currentTime is not 1hr less than or equal to sunrise or sunset', () => {
      const data = {
        icon: 'clear-night',
        sunrise: 1604836020,
        sunset: 1604872980,
      }
      expect(getWeatherBackground({timezone, ...data})).toBe('clear-night')
    })
    test('show dawn background is currentTime is 1hr less than or equal to sunrise', () => {
      const currentTime = Math.round(date.getTime() / 1000)
      const data = {
        icon: 'clear-night',
        sunrise: currentTime,
        sunset: 1604872980,
      }
      expect(getWeatherBackground({timezone, ...data})).toBe('dawn')
    })
    test('show dusk background is currentTime is 1hr less than or equal to sunset', () => {
      const currentTime = Math.round(date.getTime() / 1000)
      const data = {
        icon: 'clear-night',
        sunrise: 1604836020,
        sunset: currentTime,
      }
      expect(getWeatherBackground({timezone, ...data})).toBe('dusk')
    })
  })
})
