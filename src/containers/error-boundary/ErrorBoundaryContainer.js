import React, {Component} from 'react'
import ErrorComponent from '../../components/error/ErrorComponent'

export class ErrorBoundaryContainer extends Component {
  state = {
    hasError: false
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return {hasError: true}
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo)
  }

  render() {
    return (
      <div>
        {this.state.hasError ? (
          <ErrorComponent errorMessage={'Something went wrong.'} />
        ) : (
          this.props.children
        )}
      </div>
    )
  }
}

export default ErrorBoundaryContainer
