import React from 'react'
import {Switch, Route} from 'react-router-dom'
import HomeContainer from './containers/home/HomeContainer'
import {ThemeContextProvider} from './context/ThemeContext'

function App() {
  return (
    <ThemeContextProvider>
      <Switch>
        <Route path='/' exact component={HomeContainer}></Route>
      </Switch>
    </ThemeContextProvider>
  )
}

export default App
