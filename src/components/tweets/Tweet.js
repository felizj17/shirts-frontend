import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

import './tweet.css'

export default function Tweet({tweet}) {
  const API = process.env.REACT_APP_API_URL
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  const navigate = useNavigate()
  const [date, setDate] = useState({})
  const [edited, setEdited] = useState({})
  useEffect(() => {
    setDate(dateFormat(tweet.created_at))
    if (tweet.edited_at) {
      setEdited(dateFormat(tweet.edited_at))
    }
  }, [tweet])
  const dateFormat = date => {
    const theDate = date.toString().split('T')[0].split('-')
    const theTime = date.toString().split('T')[1].split(':')
    if (+theTime[0] > 12) {
      return {
        date: `${months[+theDate[1] - 1]} ${theDate[2]}, ${theDate[0]}`,
        time: `${+theTime[0] - 12}:${theTime[1]} `,
      }
    } else if (+theTime[0] === 0) {
      return {
        date: `${months[+theDate[1] - 1]} ${theDate[2]}, ${theDate[0]}`,
        time: `12:${theTime[1]} `,
      }
    } else {
      return {
        date: `${months[+theDate[1] - 1]} ${theDate[2]}, ${theDate[0]}`,
        time: `${+theTime[0]}:${theTime[1]}`,
      }
    }
  }
  const handleDelete = e => {
    //modal to confirm deletion
    axios.delete(`${API}/tweets/${e.target.id}`).then(_=>navigate('/'))
  }
  return (
    <div className='tweet-card'>
      <aside>
        <span>{tweet.name}</span>
        <p>{tweet.tweeter_at}</p>
      </aside>
      <p>{tweet.body}</p>
      <p>
        {date.date} {date.time}GMT{' '}
        {tweet.edited_at ? `edited at ${edited.date} ${edited.time}` : null}
      </p>
      <button onClick={() => navigate(`/edit/${tweet.id}`)}>✏️</button>
      <button id={tweet.id} onClick={handleDelete}>
        ❌
      </button>
    </div>
  )
}
