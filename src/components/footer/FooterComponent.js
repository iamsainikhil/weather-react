import React, {useContext} from 'react'
import {ThemeContext} from '../../context/ThemeContext'
import moment from 'moment-timezone'
import {Event} from '../../utils/ReactAnalytics'
import {FaHeart, FaReact} from 'react-icons/fa'

const FooterComponent = () => {
  const {theme, colorTheme} = useContext(ThemeContext)

  const emitGA = (action, label) => {
    Event({
      category: 'Footer Links',
      action,
      label,
    })
  }
  return (
    <div
      className={`text-${colorTheme} pb-3`}
      style={{
        backgroundColor: theme === 'dark' ? '#292929' : '#e8ebee',
      }}>
      <div
        className={`flex flex-col text-center sm:flex sm:flex-row justify-around p-5 text-${colorTheme} text-sm`}>
        {/* <p className='my-2 sm:my-0 w-full sm:w-1/3'>
          <a
            href='https://github.com/iamsainikhil/weather-react/'
            target='_blank'
            rel='noreferrer noopener'
            className={`link z-0 hover:text-${theme}`}
            onClick={() => emitGA('Visit GitHub', 'GitHub Link')}>
            GitHub
          </a>
        </p> */}
        <p className='flex flex-no-wrap justify-center items-center my-2 sm:my-0 w-full sm:w-1/2'>
          Made with&nbsp;
          <span
            title='Love'
            role='img'
            aria-label='Love'
            className='text-base text-heart'>
            <FaHeart />
          </span>
          &nbsp;using&nbsp;
          <span
            title='React'
            role='img'
            aria-label='React'
            className='text-base text-react'>
            <FaReact />
          </span>
        </p>
        {/* <p className='my-2 sm:my-0 w-full sm:w-1/3'>
          <Link to='/privacy-policy' className={`link z-0 hover:text-${theme}`}>
            Privacy Policy
          </Link>
        </p> */}
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
