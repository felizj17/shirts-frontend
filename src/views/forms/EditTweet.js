import {useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import axios from 'axios'

export default function EditTweet() {
  const API = process.env.REACT_APP_API_URL
  const {userId, id} = useParams()
  const navigate = useNavigate()
  const [error, setError] = useState({})
  const [tweet, setTweet] = useState({
    title: '',
    read_time: '',
    body: '',
    user_id:'',
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
      .then(_ => navigate(`/${userId}/shorts`))
      .catch(e => setError(e))
  }
  return (
    <form onSubmit={handleSubmit}>
      <button onClick={() => navigate(`/${userId}/shorts`)}>Back to feed</button>
      <label htmlFor='name'>Name</label>
      <input
        type='text'
        id='_title'
        name='_title'
        placeholder='just until we get this sorted'
        onChange={handleTextChange}
        value={tweet.title}
        required
      />
      <label htmlFor='read_time'>Read Time:</label>
      <input
        type='number'
        id='read_time'
        name='read_time'
        onChange={handleTextChange}
        value={tweet.read_time}
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
      <button onClick={() => navigate(`/${userId}/shorts`)}>Cancel</button>
      <button type='submit'>Tweet</button>
    </form>
  )
}
