import dayjs from 'dayjs'

const getWeatherIcon = code => {
  const weatherCode = code.split('.')[0]
  const hour = dayjs().format('H')
  const type = hour >= 6 && hour < 18 ? 'day' : 'night-alt'
  switch (weatherCode) {
    case 'Blizzard':
      return 'snow-wind'
    case 'Clear':
      return 'night-clear'
    case 'CloudRainThunder':
      return `${type}-storm-showers`
    case 'CloudSleetSnowThunder':
      return `${type}-snow-thunderstorm`
    case 'Cloudy':
      return 'cloudy'
    case 'Fog':
      return type === 'day' ? 'day-fog' : 'night-fog'
    case 'FreezingDrizzle':
      return `${type}-sleet`
    case 'FreezingFog':
      return `${type}-cloudy-windy`
    case 'FreezingRain':
      return `${type}-rain-mix`
    case 'HeavyRain':
      return `${type}-rain`
    case 'HeavyRainSwrsDay':
      return 'day-rain'
    case 'HeavyRainSwrsNight':
      return 'night-alt-rain'
    case 'HeavySleet':
      return 'snow-wind'
    case 'HeavySleetSwrsDay':
      return 'day-snow-wind'
    case 'HeavySleetSwrsNight':
      return 'night-alt-snow-wind'
    case 'HeavySnow':
      return 'snow'
    case 'HeavySnowSwrsDay':
      return 'day-snow-thunderstorm'
    case 'HeavySnowSwrsNight':
      return 'night-alt-snow-thunderstorm'
    case 'IsoRainSwrsDay':
      return 'day-showers'
    case 'IsoRainSwrsNight':
      return 'night-alt-showers'
    case 'IsoSleetSwrsDay':
      return 'day-sleet'
    case 'IsoSleetSwrsNight':
      return 'night-alt-sleet'
    case 'IsoSnowSwrsDay':
      return 'day-snow'
    case 'IsoSnowSwrsNight':
      return 'night-alt-snow'
    case 'Mist':
      return `${type}-rain-mix`
    case 'ModRain':
      return 'sprinkle'
    case 'ModRainSwrsDay':
      return 'day-sprinkle'
    case 'ModRainSwrsNight':
      return 'night-alt-sprinkle'
    case 'ModSleet':
      return 'sleet'
    case 'ModSleetSwrsDay':
      return 'day-sleet'
    case 'ModSleetSwrsNight':
      return 'night-alt-sleet'
    case 'ModSnow':
      return 'snow'
    case 'ModSnowSwrsDay':
      return 'day-snow'
    case 'ModSnowSwrsNight':
      return 'night-alt-snow'
    case 'OccLightRain':
      return `${type}-showers`
    case 'OccLightSleet':
      return `${type}-sleet`
    case 'OccLightSnow':
      return `${type}-snow`
    case 'Overcast':
      return type === 'day' ? 'day-sunny-overcast' : 'night-alt-cloudy'
    case 'PartCloudRainThunderDay':
      return 'day-thunderstorm'
    case 'PartCloudRainThunderNight':
      return 'night-alt-thunderstorm'
    case 'PartCloudSleetSnowThunderDay':
      return 'day-snow-thunderstorm'
    case 'PartCloudSleetSnowThunderNight':
      return 'night-alt-snow-thunderstorm'
    case 'PartlyCloudyDay':
      return 'day-cloudy'
    case 'PartlyCloudyNight':
      return 'night-alt-cloudy'
    case 'Sunny':
      return 'day-sunny'
    default:
      return 'na'
  }
}

export default getWeatherIcon
