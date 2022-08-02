import React from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'

function LocationMap (props) {
  function onMarkerClick (props, marker, event) {
    console.log(marker.name)
  }
  console.log(props)
  return (
    <>
      <Map
        google={props.google}
        style={{ width: '50%', height: '100%' }}
        zoom={12}
        initialCenter={{ lat: 49.2600, lng: -123.1752 }} >

        <Marker
          onClick={onMarkerClick}
          name={'UBC'}
          position={{ lat: 49.267941, lng: -123.247360 }}
        />
        <Marker
          onClick={onMarkerClick}
          name={'Point Grey'}
          position={{ lat: 49.271370, lng: -123.175980 }}
        />
        <Marker
          onClick={onMarkerClick}
          name={'Kitsilano'}
          position={{ lat: 49.2684, lng: -123.1683 }}
        />
        <Marker
          onClick={onMarkerClick}
          name={'Yaletown'}
          position={{ lat: 49.2757, lng: -123.1199 }}
        />
        <Marker
          onClick={onMarkerClick}
          name={'Kerrisdale'}
          position={{ lat: 49.2341, lng: -123.1554 }}
        />
        <Marker
          onClick={onMarkerClick}
          name={'Dunbar'}
          position={{ lat: 49.2500, lng: -123.1852 }}
        />
        <Marker
          onClick={onMarkerClick}
          name={'Oakridge'}
          position={{ lat: 49.2261, lng: -123.1166 }}
        />
      </Map>
    </>
  )
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY
})(LocationMap)
