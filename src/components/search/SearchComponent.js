import React from 'react'

const SearchComponent = props => {
  return (
    <div className='flex'>
      <div className='w-1/2 h-12 mx-5 mt-5'>
        <div className='relative'>
          <input
            className='block appearance-none w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white truncate ...'
            id='grid-first-name'
            type='text'
            placeholder='Type city name'
            onChange={props.citySearch}
            value={props.city}
          />
          {props.showCaret ? (
            <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
              <svg
                className='fill-current h-4 w-4'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'>
                <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
              </svg>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default SearchComponent
