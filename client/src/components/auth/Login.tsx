import { Button } from '@mui/material'
import image from '../../assets/react.svg'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useContext, useState } from 'react'
import { Store } from '../../redux/Store'

const Login = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store)
  const { userInfo } = state
  const auth = getAuth()
  const [authing, setAuthing] = useState(false)
  const signInWithGoogle = async () => {
    setAuthing(true)
    signInWithPopup(auth, new GoogleAuthProvider())
      .then((response) => {
        console.log(response.user)
        ctxDispatch({ type: 'USER_SIGNIN', payload: response.user })
        localStorage.setItem('userInfo', JSON.stringify(response.user))
      })
      .catch((error) => {
        console.log(error)
        setAuthing(false)
      })
  }

  return (
    <div className='login'>
      <div className='login-container'>
        <img src={image} alt='whatsapp' />
        <div className='login-text'>
          <h1>Connexion</h1>
        </div>
        <Button onClick={() => signInWithGoogle()} disabled={authing}>
          Se connecter avec Google
        </Button>
      </div>
    </div>
  )
}

export default Login
