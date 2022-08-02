import { React, useEffect, useState } from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserAsync } from '../../redux/users/thunks'

function LocationMap (props) {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.user.currentUser)
  const userId = useSelector(state => state.user.user)
  const [location, setLocation] = useState(currentUser.location)
  useEffect(() => {
    setLocation(currentUser.location)
  }, [currentUser.location])

  function onMarkerClick (marker) {
    setLocation(marker.name)
  }

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
      <br/>
      <Map
        google={props.google}
        style={{ width: 'auto', height: 'auto' }}
        zoom={12}
        initialCenter={{ lat: 49.2600, lng: -123.1752 }} >

        <Marker
          onClick={onMarkerClick}
          value={location}
          title={'UBC'}
          name={'UBC'}
          position={{ lat: 49.267941, lng: -123.247360 }}
        />
        <Marker
          onClick={onMarkerClick}
          value={location}
          title={'Point Grey'}
          name={'Point Grey'}
          position={{ lat: 49.271370, lng: -123.175980 }}
        />
        <Marker
          onClick={onMarkerClick}
          title={'Kitsilano'}
          name={'Kitsilano'}
          position={{ lat: 49.2684, lng: -123.1683 }}
        />
        <Marker
          onClick={onMarkerClick}
          title={'Yaletown'}
          name={'Yaletown'}
          position={{ lat: 49.2757, lng: -123.1199 }}
        />
        <Marker
          onClick={onMarkerClick}
          title={'Kerrisdale'}
          name={'Kerrisdale'}
          position={{ lat: 49.2341, lng: -123.1554 }}
        />
        <Marker
          onClick={onMarkerClick}
          title={'Dunbar'}
          name={'Dunbar'}
          position={{ lat: 49.2500, lng: -123.1852 }}
        />
        <Marker
          onClick={onMarkerClick}
          title={'Oakridge'}
          name={'Oakridge'}
          position={{ lat: 49.2261, lng: -123.1166 }}
        />
      </Map>
    </>
  )
}

export default GoogleApiWrapper({
  apiKey: 'api here'
})(LocationMap)
