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

export default function Map (props) {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.user.currentUser)
  const userId = useSelector(state => state.user.user)
  const [location, setLocation] = useState(currentUser.location)
  useEffect(() => {
    setLocation(currentUser.location)
  }, [currentUser.location])

  const handleUpdate = async (event) => {
    event.preventDefault()
    await dispatch(updateUserAsync({
      userId,
      location
    })).unwrap()
  }

  return (
    <>
      <Button variant="outline-primary" onClick={handleUpdate}>Update Location</Button>
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
              setLocation(location.name)
            )}
          />
        ))}
      </GoogleMap>
    </>
  )
}
