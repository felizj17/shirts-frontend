import { useState } from 'react'
import axios from 'axios'
import './auth.css'

export default function Register() {
    const API = process.env.REACT_APP_API_URL
    const [user, setUser] = useState({
        email:'',
        username:'',
        _at:'',
        password:'',
        confirm:''
    })
    const [error, setError] = useState()
    const [message, setMessage] = useState()
const handleTextChange = e=>{
    setUser({
        ...user,
        [e.target.name]:e.target.value
    })
}
  const handleSubmit = e => {
    e.preventDefault()
    if(user.password ===user.confirm){
        const newUser = {
            email:user.email,
            username:user.username,
            _at:user._at,
            password:user.password
        }
        axios.post(`${API}/users/signup`, newUser).then(res=>{
            setMessage(res.message)
            setTimeout(()=>{setMessage()})
        })
    }else{
        setError({error:"Passwords do not match, please try again. "})
        setTimeout(()=>{setError()},3000)
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
        onChange={handleTextChange}

      />
      <br />
      <label className='reg-label' htmlFor='_at'>
        Shorty:
      </label>
      <br />
      <input
        className='reg-input'
        type='text'
        required
        id='_at'
        name='_at'
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
        onChange={handleTextChange}
        required
      />
      <br />
      <button className='reg-btn' type='submit'>Create Account</button>
    </form>
  )
}
