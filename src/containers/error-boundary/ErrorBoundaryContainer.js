import React, {Component} from 'react'
import ErrorComponent from '../../components/error/ErrorComponent'
import * as Sentry from '@sentry/browser'

export class ErrorBoundaryContainer extends Component {
  state = {
    hasError: false,
    eventId: null,
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return {hasError: true}
  }

  componentDidCatch(error, errorInfo) {
    Sentry.withScope((scope) => {
      scope.setExtras(errorInfo)
      const eventId = Sentry.captureException(error)
      this.setState({eventId})
    })
  }

  render() {
    return (
      <div>
        {this.state.hasError ? (
          <div className='flex'>
            <div className='w-1/6'></div>
            <div className='flex-col w-2/3 justify-center text-center'>
              <ErrorComponent
                errorMessage={'Something went wrong. Reload the page!'}
              />
              <button
                className='font-semibold py-3 px-6 rounded-full capitalize text-sun'
                onClick={() =>
                  Sentry.showReportDialog({eventId: this.state.eventId})
                }>
                Report feedback
              </button>
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
