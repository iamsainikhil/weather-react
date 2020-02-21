import {groupBy, mapValues} from 'lodash-es'

/**
 *
 * @param {Array} data (WeatherForecast)
 * @param {String} type ('wx_icon' or 'wx_desc')
 */
const GroupedDayIcons = (data, type) => {
  const groupedDaysByIcon = data.Days.map(day => {
    return groupBy(day.Timeframes, type)
  })

  const groupedDaysIconByCount = groupedDaysByIcon.map(dayIcon => {
    return mapValues(dayIcon, function(key) {
      return key.length
    })
  })

  const groupedDayIcons = groupedDaysIconByCount.map(icon => {
    return Object.keys(icon).sort((a, b) => icon[b] - icon[a])[0]
  })

  return groupedDayIcons
}

export default GroupedDayIcons
