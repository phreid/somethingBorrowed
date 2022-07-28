import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { logoutAsync } from '../../redux/users/thunks'

export default function LogoutPage () {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // note: React.StrictMode renders components twice, so
  // this effect will happen twice, and the second time the call to
  // the logout API will fail
  useEffect(() => {
    const logout = async () => {
      await dispatch(logoutAsync()).unwrap()
      navigate('/')
    }
    logout()
  })

  return <></>
}
