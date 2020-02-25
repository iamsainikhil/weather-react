import React, {Fragment} from 'react'
import InfoComponent from '../../components/weather/InfoComponent'
import InfoDetailComponent from '../../components/weather/InfoDetailComponent'
import LoaderComponent from './../../components/loader/LoaderComponent'

const CurrentWeatherContainer = ({
  weatherCurrent,
  address,
  latlong,
  formattedDateTime
}) => {
  return (
    <Fragment>
      {address && weatherCurrent ? (
        <Fragment>
          <InfoComponent
            address={address}
            latlong={latlong}
            formattedDateTime={formattedDateTime}
          />
          <InfoDetailComponent weatherCurrent={weatherCurrent} />
        </Fragment>
      ) : (
        <LoaderComponent />
      )}
    </Fragment>
  )
}

export default CurrentWeatherContainer
