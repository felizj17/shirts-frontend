import {useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import axios from 'axios'

export default function EditTweet() {
  const API = process.env.REACT_APP_API_URL
  const {id} = useParams()
  const navigate = useNavigate()
  const [error, setError] = useState({})
  const [tweet, setTweet] = useState({
    name: '',
    tweeter_at: '',
    body: '',
    user_id: 0,
  })
  useEffect(()=>{
    axios.get(`${API}/tweets/${id}`)
    .then(res=>setTweet(res.data))
  },[])
  const handleTextChange = e => {
    setTweet({
      ...tweet,
      [e.target.name]: e.target.value,
    })
  }
  const handleSubmit = e => {
    e.preventDefault()
    axios
      .put(`${API}/tweets/${id}`, tweet)
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
        value={tweet.name}
        required
      />
      <label htmlFor='tweeter_at'>your @</label>
      <input
        type='text'
        id='tweetr_at'
        name='tweeter_at'
        placeholder='@killerMike'
        onChange={handleTextChange}
        value={tweet.tweeter_at}
        required
      />
      <textarea
        id='body'
        name='body'
        placeholder="Just say what's on your mind..."
        onChange={handleTextChange}
        value={tweet.body}
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
