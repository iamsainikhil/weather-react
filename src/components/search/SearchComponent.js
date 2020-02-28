import React from 'react'

const SearchComponent = props => {
  return (
    <div className='h-12 mx-5 mt-5'>
      <div className='relative'>
        <div className='absolute top-0 left-0 ml-4 mt-4'>
          <img
            src='./city-weather-search.svg'
            alt='city search'
            className='h-6 object-contain object-center'
          />
        </div>
        <input
          className={`block appearance-none w-full bg-gray-300 border-none rounded-full shadow py-3 pl-12 pr-4 mb-3 leading-tight focus:outline-none focus:bg-light truncate`}
          id='grid-first-name'
          type='text'
          placeholder='Type city name to find weather forecast'
          onChange={props.citySearch}
          value={props.city}
        />
        {props.showCaret && props.city.trim() ? (
          <div
            className='flex right-0 absolute top-0 mr-4 mt-4 cursor-pointer'
            onClick={props.caretClicked}>
            {props.showAddresses ? (
              <img
                src='./up-arrow.svg'
                alt='arrow-up'
                className='h-4 object-contain object-center'
              />
            ) : (
              <img
                src='./down-arrow.svg'
                alt='arrow-down'
                className='h-4 object-contain object-center'
              />
            )}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default SearchComponent
