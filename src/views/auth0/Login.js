export default function Login() {
  const handleSubmit = e => {
    e.preventDefault()
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='email'>Email: </label>
      <input type='email' required id='email' name='email' />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <label htmlFor='password'>Password: </label>
      <input type='password' id='password' name='password' required />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

      <button type='submit'>Login</button>
    </form>
  )
}
