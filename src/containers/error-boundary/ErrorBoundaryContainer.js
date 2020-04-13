import React, {Component} from 'react'
import ErrorComponent from '../../components/error/ErrorComponent'

export class ErrorBoundaryContainer extends Component {
  state = {
    hasError: false,
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return {hasError: true}
  }

  render() {
    return (
      <div>
        {this.state.hasError ? (
          <div className='flex'>
            <div className='w-1/6'></div>
            <div className='w-2/3 justify-center text-center'>
              <ErrorComponent
                errorMessage={'Something went wrong. Reload the page!'}
              />
            </div>
          </div>
        ) : (
          this.props.children
        )}
      </div>
    )
  }
}

export default ErrorBoundaryContainer
