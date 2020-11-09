import FormatTime from './../utils/FormatTime'

const time = 1604879357 // (6:49 PM)
const timezone = 'America/New_York'

describe('FormatTime util functionality test', () => {
  test("should return formatted date-time string 'Sunday 6:49 PM' for time 6:49PM (NY) with formatType as 'dddd h:mm A'", () => {
    expect(FormatTime(time, timezone, 'dddd h:mm A')).toBe('Sunday 6:49 PM')
  })
  test("should return formatted date string 'Sun' for time 6:49PM (NY) with formatType as 'ddd'", () => {
    expect(FormatTime(time, timezone, 'ddd')).toBe('Sun')
  })
  test("should return formatted date string '11/08/2020' for time 6:49PM (NY) with formatType as 'MM/DD/YYYY'", () => {
    expect(FormatTime(time, timezone, 'MM/DD/YYYY')).toBe('11/08/2020')
  })
  test("should return formatted time string '6:49 PM' for time 6:49PM (NY) with formatType as 'h:mm A'", () => {
    expect(FormatTime(time, timezone, 'h:mm A')).toBe('6:49 PM')
  })
  test("should return formatted time string '18:49' for time 6:49PM (NY) with formatType as 'H:mm'", () => {
    expect(FormatTime(time, timezone, 'H:mm')).toBe('18:49')
  })
  test("should return formatted time string '18' for time 6:49PM (NY) with formatType as 'H'", () => {
    expect(FormatTime(time, timezone, 'H')).toBe('18')
  })
})
