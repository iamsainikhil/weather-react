import React, {Fragment} from 'react'
import InfoComponent from '../../components/weather/InfoComponent'
import InfoDetailComponent from '../../components/weather/InfoDetailComponent'
import LoaderComponent from './../../components/loader/LoaderComponent'
import ErrorBoundaryContainer from '../error-boundary/ErrorBoundaryContainer'

const CurrentWeatherContainer = ({
  weatherCurrent,
  address,
  latlong,
  urbanArea
}) => {
  return (
    <ErrorBoundaryContainer>
      <Fragment>
        {address && weatherCurrent ? (
          <div>
            <InfoComponent
              address={address}
              latlong={latlong}
              urbanArea={urbanArea}
              weatherCurrent={weatherCurrent}
            />
            <InfoDetailComponent weatherCurrent={weatherCurrent} />
          </div>
        ) : (
          <LoaderComponent />
        )}
      </Fragment>
    </ErrorBoundaryContainer>
  )
}

export default CurrentWeatherContainer
