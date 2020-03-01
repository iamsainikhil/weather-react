import React, {useContext} from 'react'
import {Switch, Route} from 'react-router-dom'
import HomeContainer from './containers/home/HomeContainer'
import {ThemeContext} from './context/ThemeContext'

const App = () => {
  const {theme} = useContext(ThemeContext)
  return (
    <div className={` bg-${theme} tracking-wide border-box`}>
      <Switch>
        <Route path='/' exact component={HomeContainer}></Route>
      </Switch>
    </div>
  )
}

export default App
