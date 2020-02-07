import React, {Component} from 'react'
import AutoCompleteContainer from '../autocomplete/AutoCompleteContainer'
import './HomeStyle.scss'

export class HomeContainer extends Component {
  render() {
    return (
      <div>
        <div>
          <AutoCompleteContainer />
        </div>
      </div>
    )
  }
}

export default HomeContainer
