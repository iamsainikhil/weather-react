import React, {useContext} from 'react'
import Toggle from 'react-toggle'
import './ReactToggle.scss'
import {ThemeContext} from '../../context/ThemeContext'
import IconComponent from '../icon/IconComponent'

const HeaderComponent = () => {
  const {theme, colorTheme, toggleTheme} = useContext(ThemeContext)
  return (
    <div className='flex justify-between items-center px-5 py-5'>
      <div>
        <i
          className={`wi wi-cloudy text-3xl text-${colorTheme}`}
          title='Weather App'></i>
      </div>
      <div>
        <Toggle
          checked={theme === 'light'}
          icons={{
            checked: <IconComponent iconType={'light'} />,
            unchecked: <IconComponent iconType={'dark'} />
          }}
          onChange={toggleTheme}
        />
      </div>
    </div>
  )
}

export default HeaderComponent
