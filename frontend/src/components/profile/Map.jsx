import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api'

const containerStyle = {
  width: '1080px',
  height: '400px'
}

const center = {
  lat: 49.2600,
  lng: -123.1752
}

export default function Map () {
  return (
    <LoadScript
      googleMapsApiKey = {process.env.REACT_APP_MAPS_API_KEY}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
    </LoadScript>
  )
}
