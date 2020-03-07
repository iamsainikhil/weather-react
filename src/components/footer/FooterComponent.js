import React, {useContext} from 'react'
import {ThemeContext} from '../../context/ThemeContext'
import moment from 'moment-timezone'
import {Link} from 'react-router-dom'
import {Event} from '../../utils/ReactAnalytics'

const FooterComponent = () => {
  const {theme, colorTheme} = useContext(ThemeContext)

  const emitGA = (action, label) => {
    Event({
      category: 'Footer Links',
      action,
      label
    })
  }
  return (
    <div
      className={`text-${colorTheme} pb-3`}
      style={{
        backgroundColor: theme === 'dark' ? '#292929' : '#e8ebee'
      }}>
      <div
        className={`flex flex-col text-center sm:flex sm:flex-row justify-around p-5 text-${colorTheme} text-sm`}>
        <p className='my-2 sm:my-0 w-full sm:w-1/3'>
          <a
            href='https://github.com/iamsainikhil/weather-react/'
            target='_blank'
            rel='noreferrer noopener'
            className={`link z-0 hover:text-${theme}`}
            onClick={() => emitGA('Visit GitHub', 'GitHub Link')}>
            GitHub
          </a>
        </p>
        <p className='flex flex-no-wrap justify-center my-2 sm:my-0 w-full sm:w-1/2'>
          Made with&nbsp;
          <span title='Love' role='img' aria-label='Love' className='w-5 h-5'>
            ❤️
          </span>
          &nbsp;using&nbsp;
          <img
            src='./react.svg'
            alt='React'
            title='React'
            className='w-4 h-4 object-contain object-center'></img>
          &nbsp;by&nbsp;
          <span title='Sai Nikhil' role='img' aria-label='Sai Nikhil'>
            👨‍💻
          </span>
        </p>
        <p className='my-2 sm:my-0 w-full sm:w-1/3'>
          <Link to='/privacy-policy' className={`link z-0 hover:text-${theme}`}>
            Privacy Policy
          </Link>
        </p>
      </div>
      <p className='mx-auto text-center text-sm'>
        &copy; {moment().format('YYYY')}{' '}
        <a
          className={`link z-0 hover:text-${theme}`}
          href='https://iamsainikhil.github.io'
          target='_blank'
          rel='noreferrer noopener'
          onClick={() => emitGA('Visit Portfolio', 'Portfolio Link')}>
          Sai Nikhil
        </a>
      </p>
    </div>
  )
}

export default FooterComponent
