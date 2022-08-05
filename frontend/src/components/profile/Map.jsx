import React from 'react'
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api'

const containerStyle = {
  width: '1080px',
  height: '400px'
}

const center = {
  lat: 49.2600,
  lng: -123.1752
}

const allLocations = {
  locations:
    [
      {
        loc_id: 1,
        name: 'UBC',
        desc: 'UBC',
        lat: 49.267941,
        lng: -123.247360
      },
      {
        loc_id: 2,
        name: 'Point Grey',
        desc: 'Point Grey',
        lat: 49.271370,
        lng: -123.175980
      },
      {
        loc_id: 3,
        name: 'Kitsilano',
        desc: 'Kitsilano',
        lat: 49.2684,
        lng: -123.1683
      },
      {
        loc_id: 4,
        name: 'Yaletown',
        desc: 'Yaletown',
        lat: 49.2757,
        lng: -123.1199
      },
      {
        loc_id: 5,
        name: 'Kerrisdale',
        desc: 'Kerrisdale',
        lat: 49.2341,
        lng: -123.1554
      },
      {
        loc_id: 6,
        name: 'Dunbar',
        desc: 'Dunbar',
        lat: 49.2500,
        lng: -123.1852
      },
      {
        loc_id: 7,
        name: 'Oakridge',
        desc: 'Oakridge',
        lat: 49.2261,
        lng: -123.1166
      }
    ]
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
        {allLocations.locations.map(location => (
          <MarkerF
            key={location.loc_id}
            position={{
              lat: location.lat,
              lng: location.lng
            }}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  )
}