import React, {useContext} from 'react'
import Toggle from 'react-toggle'
import './ReactToggle.scss'
import {ThemeContext} from '../../context/ThemeContext'
import IconComponent from '../icon/IconComponent'
import {Link} from 'react-router-dom'
import {isEmpty} from 'lodash-es'
import AssetsSrcURL from '../../utils/AssetsSrcURL'

const HeaderComponent = () => {
  const {theme, toggleTheme} = useContext(ThemeContext)

  return (
    <div className='flex justify-between items-center px-5 py-5'>
      <div>
        <Link to='/'>
          <img
            src={`${AssetsSrcURL}/logo.png`}
            alt='Logo'
            className='h-12 w-12 object-contain object-center cursor-pointer'
          />
        </Link>
      </div>
      <div>
        {/* below condition to avoid toggle glitch effect on page refresh */}
        {!isEmpty(theme) ? (
          <Toggle
            checked={theme === 'light'}
            icons={{
              checked: <IconComponent iconType={'light'} />,
              unchecked: <IconComponent iconType={'dark'} />,
            }}
            onChange={toggleTheme}
          />
        ) : null}
      </div>
    </div>
  )
}

export default HeaderComponent
