import React, { useEffect, useState } from 'react'
import { GoogleMap, MarkerF } from '@react-google-maps/api'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'react-bootstrap'
import { updateUserAsync } from '../../redux/users/thunks'

const containerStyle = {
  width: 'auto',
  height: '480px'
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
        lat: 49.2610,
        lng: -123.2001
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
        name: 'Arbutus',
        desc: 'Arbutus',
        lat: 49.2571,
        lng: -123.1662
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
        name: 'Southlands',
        desc: 'Southlands',
        lat: 49.2500,
        lng: -123.1852
      }
    ]
}

export default function Map (props) {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.user.currentUser)
  const userId = useSelector(state => state.user.user)

  const [userLocation, setUserLocation] = useState(currentUser.location)
  useEffect(() => {
    setUserLocation(currentUser.location)
  }, [currentUser.location])

  const handleUpdate = (event) => {
    event.preventDefault()
    dispatch(updateUserAsync({
      userId,
      location: userLocation
    }))
  }

  return (
    <>
      <Button className='profile-btn' onClick={handleUpdate}>Update Location</Button>
      <div className='map-div'>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={12}
        >
          {allLocations.locations.map(location => (
            <MarkerF
              key={location.loc_id}
              position={{
                lat: location.lat,
                lng: location.lng
              }}
              title={location.name}
              onClick={() => (
                setUserLocation(location.name)
              )}
            />
          ))}
        </GoogleMap>
      </div>
    </>
  )
}
