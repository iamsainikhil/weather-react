import React, {useState, useEffect} from 'react'
import dayjs from 'dayjs'

const ThemeContext = React.createContext({
  theme: 'light',
  toggleTheme: () => {}
})

const ThemeContextProvider = ({children}) => {
  const [theme, setTheme] = useState('light')

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  useEffect(() => {
    // set theme based on the time on initial application load
    const hour = dayjs().format('H')
    if (hour >= 6 && hour < 18) {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }, [])

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  )
}

export {ThemeContext, ThemeContextProvider}
