import { useEffect } from 'react'
import { auth } from '../firebase'
import { useHistory } from 'react-router-dom'
import LoadingSpinner from '../components/UI/LoadingSpinner'
const CheckAuthState = () => {
  const history = useHistory()
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setTimeout(() => {
          // console.log('redirected to home')
          history.push('/home')
        }, 1000)
      } else {
        setTimeout(() => {
          // console.log('redirected')
          history.push('/register')
        }, 1000)
      }
    })
  })

  return (
    <div style={{ margin: '0px auto', justifyContent: 'center' }}>
      <LoadingSpinner />
    </div>
  )
}

export default CheckAuthState
