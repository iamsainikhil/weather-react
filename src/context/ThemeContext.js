import React, {useState, useEffect} from 'react'
import moment from 'moment-timezone'
import {Event} from '../utils/ReactAnalytics'

const ThemeContext = React.createContext({
  theme: 'light',
  toggleTheme: () => {}
})

// track theme toggles to GA
const emitGA = theme => {
  Event({
    category: 'Theme',
    action: 'Toggle Theme',
    label: theme
  })
}

const ThemeContextProvider = ({children}) => {
  const [theme, setTheme] = useState('')
  const colorTheme = theme === 'light' ? 'dark' : 'light'

  const toggleTheme = () => {
    const selectedTheme = theme === 'light' ? 'dark' : 'light'
    emitGA(selectedTheme)
    setTheme(selectedTheme)
    saveThemePreference(selectedTheme)
  }

  const saveThemePreference = theme => {
    localStorage.setItem('theme', JSON.stringify(theme))
  }

  const daynightChecker = () => {
    const hour = moment().format('H')
    if (hour >= 6 && hour < 18) {
      setTheme('light')
      saveThemePreference('light')
    } else {
      setTheme('dark')
      saveThemePreference('dark')
    }
  }

  useEffect(() => {
    // set theme based on the time on initial application load and
    // when there is no theme preference in the localStorage
    if (!localStorage.getItem('theme')) {
      daynightChecker()
    } else {
      let savedTheme = localStorage.getItem('theme')
      try {
        savedTheme = JSON.parse(savedTheme)
      } catch (e) {
        // legacy value stored without JSON.stringify (plain string)
      }
      if (savedTheme === 'light' || savedTheme === 'dark') {
        setTheme(savedTheme)
      } else {
        daynightChecker()
      }
    }
    // eslint-disable-next-line
  }, [])

  return (
    <ThemeContext.Provider value={{theme, colorTheme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  )
}

export {ThemeContext, ThemeContextProvider}
