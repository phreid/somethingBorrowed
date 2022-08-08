import React from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteUserAsync } from '../../redux/users/thunks'

export default function DeleteUserAccountForm () {
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
      <strong>
        <p>Are you sure you want to delete this account?</p>
        <p>This action cannot be undone.</p>
      </strong>
      <br/>
      <div className='modal-buttons text-center' >
        <Button className='delete-acc-btn' variant="danger" onClick={onSubmit}>Yes</Button>
      </div>
    </div>
  )
}
