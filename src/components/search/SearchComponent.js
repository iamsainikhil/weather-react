import React from 'react'

const SearchComponent = props => {
  return (
    <div className='h-12 mx-5 mt-5'>
      <div className='relative'>
        <input
          className={`block appearance-none w-full bg-gray-300 border-none rounded-full shadow py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-light truncate`}
          id='grid-first-name'
          type='text'
          placeholder='🔍 Type city name to find weather'
          onChange={props.citySearch}
          value={props.city}
        />
        {props.showCaret && props.city.trim() ? (
          <div
            className='flex right-0 absolute top-0 mx-2 my-2 cursor-pointer'
            onClick={props.caretClicked}>
            {props.showAddresses ? (
              <img
                src='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDEwMCAxMDAiIGlkPSJMYXllcl8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48cG9seWdvbiBmaWxsPSIjMDEwMTAxIiBwb2ludHM9IjIyLjQsNjQuMSA1MC44LDM2LjUgNzkuMyw2NC4xIDgwLjgsNjMuMiA1MC44LDM0LjEgMjAuOCw2My4yIDIyLjQsNjQuMSAiLz48L3N2Zz4='
                alt='arrow-up'
                style={{width: '35px'}}
              />
            ) : (
              <img
                src='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDEwMCAxMDAiIGlkPSJMYXllcl8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48cG9seWdvbiBmaWxsPSIjMDEwMTAxIiBwb2ludHM9IjIzLjEsMzQuMSA1MS41LDYxLjcgODAsMzQuMSA4MS41LDM1IDUxLjUsNjQuMSAyMS41LDM1IDIzLjEsMzQuMSAiLz48L3N2Zz4='
                alt='arrow-down'
                style={{width: '35px'}}
              />
            )}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default SearchComponent
