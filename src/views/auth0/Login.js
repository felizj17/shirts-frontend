import {useState} from 'react'
import axios from 'axios'
import ErrorMessage from '../../messages/ErrorMessage'
export default function Login({handleSignin}) {
  const API = process.env.REACT_APP_API_URL
  const [error, setError] = useState()
  const [user, setUser] = useState({
    email:'',
    password:''
  })
  const handleTextChange = e =>{
    setUser({
      ...user,
      [e.target.name]:e.target.value
    })
  }
  const handleLogin = e => {
    e.preventDefault()
    axios.post(`${API}/users/login`, user)
    .then(res=>{
      handleSignin(res.data.user[0])
    })
    .catch(err=>{
      setError(err.response.data.error)
      setTimeout(()=>{setError()},3000)
    })

  }
  return (
    <form onSubmit={handleLogin}>
      <label htmlFor='email'>Email: </label>
      <input type='email' required id='email' name='email' onChange={handleTextChange} />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <label htmlFor='password'>Password: </label>
      <input type='password' id='password' name='password' onChange={handleTextChange} required />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <button type='submit'>Login</button>
      {error&&<ErrorMessage error={error}/>}
    </form>
  )
}
