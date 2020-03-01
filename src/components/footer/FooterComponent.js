import React, {useContext} from 'react'
import {ThemeContext} from '../../context/ThemeContext'
import moment from 'moment-timezone'

const FooterComponent = () => {
  const {colorTheme} = useContext(ThemeContext)
  return (
    <div
      className={`flex flex-col text-center sm:flex sm:flex-row justify-around p-5 text-${colorTheme}`}>
      <p>Credits</p>
      <p>
        &copy; {moment().format('YYYY')}{' '}
        <a
          className={`special-link z-0 hover:text-${colorTheme}`}
          href='https://iamsainikhil.github.io'
          target='_blank'
          rel='noreferrer noopener'>
          Sai Nikhil
        </a>
      </p>
      <p>Privacy Policy</p>
    </div>
  )
}

export default FooterComponent
