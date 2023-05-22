import './auth.css'


export default function Register() {
  const handleSubmit = e => {
    e.preventDefault()
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
        required
      />
      <br />
      <label className='reg-label' htmlFor='confirm-password'>
        Confirm Password:
      </label>
      <br />
      <input
        className='reg-input'
        type='password'
        id='confirm-password'
        name='confirm-password'
        required
      />
      <br />
      <button className='reg-btn' type='submit'>Create Account</button>
    </form>
  )
}
