import {useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import axios from 'axios'
import './form.css'
export default function NewTweet({user}) {
  const API = process.env.REACT_APP_API_URL
  const navigate = useNavigate()
  const {userId} = useParams()
  const [error, setError] = useState({})
  const [tweet, setTweet] = useState({
    _title: '',
    read_time: '',
    body: '',
  })
  const handleTextChange = e => {
    setTweet({
      ...tweet,
      [e.target.name]: e.target.value,
    })
  }
  const handleSubmit = e => {
    e.preventDefault()
    const newShort = {
      title: tweet._title,
      body: tweet.body,
      read_time: tweet.read_time,
      user_id: userId,
    }
    axios
      .post(`${API}/tweets`, newShort)
      .then(res => navigate(`/${userId}/shorts/${res.data.id}`))
      .catch(e => setError(e))
  }
  return (
    <div>
      <button className='back' onClick={() => navigate(`/${userId}/shorts`)}>
        Back to feed
      </button>
      <form className='form' onSubmit={handleSubmit}>
        <br />
        <label className='short-label' htmlFor='_title'>
          Title:
        </label>
        <input
          className='short-input'
          type='text'
          id='_title'
          name='_title'
          placeholder='Into the Deeps'
          onChange={handleTextChange}
          required
        />
        <label className='short-label' htmlFor='body'>
          Short:
        </label>
        <textarea
          id='body'
          name='body'
          placeholder="Just say what's on your mind..."
          onChange={handleTextChange}
          required
        />
        <aside>
          <label className='read-label' htmlFor='read_time'>
            Read time:
          </label>
          <input
            className='read'
            type='number'
            id='read_time'
            name='read_time'
            placeholder='2'
            onChange={handleTextChange}
            required
          />
        </aside>
        <section className='form-btns'>
          <button
            className='form-btn cancel'
            onClick={() => navigate(`/${userId}/shorts`)}
          >
            Cancel
          </button>
          <button className='form-btn post' type='submit'>
            Post
          </button>
        </section>
      </form>
    </div>
  )
}
