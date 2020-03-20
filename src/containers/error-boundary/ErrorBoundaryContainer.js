import React, {Component} from 'react'
import ErrorComponent from '../../components/error/ErrorComponent'

export class ErrorBoundaryContainer extends Component {
  state = {
    hasError: false,
    eventId: null
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return {hasError: true}
  }

  render() {
    return (
      <div>
        {this.state.hasError ? (
          <div>
            <ErrorComponent
              errorMessage={'Something went wrong. Reload the page!'}
            />
          </div>
        ) : (
          this.props.children
        )}
      </div>
    )
  }
}

export default ErrorBoundaryContainer
