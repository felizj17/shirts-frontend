import {useEffect, useState} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'

export default function Short() {
  const API = process.env.REACT_APP_API_URL
  const {userId, id} = useParams()
  const [short, setShort] = useState()
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
  const [date, setDate] = useState({})
  const [edited, setEdited] = useState()
  useEffect(() => {
    if (short) {
      setDate(dateFormat(short.created_at))
      if (short.edited_at) {
        setEdited(dateFormat(short.edited_at))
      }
    }
  }, [short])
  const dateFormat = date => {
    const theDate = date.split('T')[0].split('-')
    const theTime = date.split('T')[1].split(':')
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
  useEffect(() => {
    axios
      .get(`${API}/users/${userId}/shorts/${id}`)
      .then(res => setShort(res.data))
  }, [])
  return (
    <div>
      {short && (
        <div>
          <h1>{short.title}</h1>
          <span>Posted: {date.date} {date.time} {'\t'} {edited?`| Edited at ${edited.date} ${edited.time}`:null}</span>
        </div>
      )}
    </div>
  )
}
