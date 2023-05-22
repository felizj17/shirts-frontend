import {useState} from 'react'
import axios from 'axios'
import './auth.css'
import ErrorMessage from '../../messages/ErrorMessage'
import SuccessMessage from '../../messages/SuccessMessage'

export default function Register() {
  const API = process.env.REACT_APP_API_URL
  const [user, setUser] = useState({
    email: '',
    username: '',
    shorty: '',
    password: '',
    confirm: '',
  })
  const [error, setError] = useState()
  const [message, setMessage] = useState()
  const handleTextChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    })
  }
  const handleSubmit = e => {
    e.preventDefault()
    if (user.password === user.confirm) {
      const newUser = {
        email: user.email,
        username: user.username,
        shorty: `@${user.shorty}`,
        password: user.password,
      }
      axios
        .post(`${API}/users/signup`, newUser)
        .then(res => {
          setMessage(res.data.message)
          setUser({
            email: '',
            username: '',
            shorty: '',
            password: '',
            confirm: '',
          })
          setTimeout(() => {
            setMessage()
          }, 3000)
        })
        .catch(err => {
          if (err.response) {
              setError(err.response.data.error)
            } else {
              setError(err.message)
          }
          setTimeout(() => {
            setError()
          }, 3000)
        })
    } else {
      setError('Passwords do not match, please try again. ')
      setTimeout(() => {
        setError()
      }, 3000)
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <label className='reg-label' htmlFor='email'>
        Email:
      </label>
      <br />
      <input
        className='reg-input'
        type='email'
        required
        id='email'
        name='email'
        value={user.email}
        onChange={handleTextChange}
      />
      <br />
      <label className='reg-label' htmlFor='username'>
        Username:
      </label>
      <br />
      <input
        className='reg-input'
        type='text'
        required
        id='username'
        name='username'
        value={user.username}
        onChange={handleTextChange}
      />
      <br />
      <label className='reg-label' htmlFor='shorty'>
        Shorty:
      </label>
      <br />
      <input
        className='reg-input'
        type='text'
        required
        id='shorty'
        name='shorty'
        value={user.shorty}
        onChange={handleTextChange}
      />
      <br />
      <label className='reg-label' htmlFor='password'>
        Password:
      </label>
      <br />
      <input
        className='reg-input'
        type='password'
        id='password'
        name='password'
        onChange={handleTextChange}
        value={user.password}
        required
      />
      <br />
      <label className='reg-label' htmlFor='confirm'>
        Confirm Password:
      </label>
      <br />
      <input
        className='reg-input'
        type='password'
        id='confirm'
        name='confirm'
        value={user.confirm}
        onChange={handleTextChange}
        required
      />
      <br />
      <button className='reg-btn' type='submit'>
        Create Account
      </button>
      {error && <ErrorMessage error={error} />}
      {message && <SuccessMessage message={message} />}
    </form>
  )
}
