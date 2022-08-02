import React from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'

function LocationMap (props) {
  console.log(props)
  return (
    <>
      <Map
        google={props.google}
        style={{ width: '100%', height: '100%' }}
        zoom={12}
        initialCenter={{ lat: 49.2575, lng: -123.1005 }} >
        <Marker
          name={'UBC'}
          position={{ lat: 49.267941, lng: -123.247360 }}
        />
        <Marker
          name={'Point Grey'}
          position={{ lat: 49.271370, lng: -123.175980 }}
        />
        <Marker
          name={'Kitsilano'}
          position={{ lat: 49.2684, lng: -123.1683 }}
        />
        <Marker
          name={'Yaletown'}
          position={{ lat: 49.2757, lng: -123.1199 }}
        />
        <Marker
          name={'Kerrisdale'}
          position={{ lat: 49.2341, lng: -123.1554 }}
        />
        <Marker
          name={'Dunbar'}
          position={{ lat: 49.2500, lng: -123.1852 }}
        />
        <Marker
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
