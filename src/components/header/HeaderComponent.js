import React, {useContext} from 'react'
import Toggle from 'react-toggle'
import './ReactToggle.scss'
import {ThemeContext} from '../../context/ThemeContext'
import IconComponent from '../icon/IconComponent'

const HeaderComponent = () => {
  const {theme, toggleTheme} = useContext(ThemeContext)
  return (
    <div className='flex justify-between items-center px-5 py-5'>
      <div>
        <img
          src='./logo.png'
          alt='Logo'
          className='h-12 w-12 object-contain object-center'
        />
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
