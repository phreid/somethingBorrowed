import { useDispatch, useSelector } from 'react-redux'
import React from 'react'
import { Button } from 'react-bootstrap'
import { deleteUserAsync } from '../redux/users/thunks'
import { useNavigate } from 'react-router-dom'

export default function DeleteUserForm () {
  const userId = useSelector(state => state.user.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = (event) => {
    event.preventDefault()
    dispatch(deleteUserAsync(userId)).unwrap()
    navigate('/')
  }

  return (
    <div>
      <strong>Are you sure you want to delete this profile?</strong>
      <div>
        <Button variant="danger" onClick={onSubmit}>Yes</Button>
      </div>
    </div>
  )
}
