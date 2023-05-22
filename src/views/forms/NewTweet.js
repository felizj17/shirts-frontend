import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

export default function NewTweet() {
  const API = process.env.REACT_APP_API_URL
  const navigate = useNavigate()
  const [error, setError] = useState({})
  const [tweet, setTweet] = useState({
    name: '',
    tweeter_at: '',
    body: '',
    user_id: 0,
  })
  const handleTextChange = e => {
    setTweet({
      ...tweet,
      [e.target.name]: e.target.value,
    })
  }
  const handleSubmit = e => {
    e.preventDefault()
    axios
      .post(`${API}/tweets`, tweet)
      .then(_ => navigate('/'))
      .catch(e => setError(e))
  }
  return (
    <form onSubmit={handleSubmit}>
      <button onClick={() => navigate('/')}>Back to feed</button>
      <label htmlFor='name'>Name</label>
      <input
        type='text'
        id='name'
        name='name'
        placeholder='just until we get this sorted'
        onChange={handleTextChange}
        required
      />
      <label htmlFor='tweeter_at'>your @</label>
      <input
        type='text'
        id='tweetr_at'
        name='tweeter_at'
        placeholder='@killerMike'
        onChange={handleTextChange}
        required
      />
      <textarea
        id='body'
        name='body'
        placeholder="Just say what's on your mind..."
        onChange={handleTextChange}
        required
      />
      <input
        type='number'
        id='user_id'
        name='user_id'
        value={tweet.user_id}
        onChange={handleTextChange}
      />
      <button onClick={() => navigate('/')}>Cancel</button>
      <button type='submit'>Tweet</button>
    </form>
  )
}
