import {useEffect, useState} from 'react'
import axios from 'axios'
import {useParams, useNavigate} from 'react-router-dom'
import Modal from '../../components/modal/Modal'

export default function Short() {
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
  const API = process.env.REACT_APP_API_URL
  const {userId, id} = useParams()
  const navigate = useNavigate()
  const [short, setShort] = useState()
  const [modal, setModal] = useState(false)
  const [date, setDate] = useState({})
  const [edited, setEdited] = useState()
  useEffect(() => {
    axios
      .get(`${API}/users/${userId}/shorts/${id}`)
      .then(res => setShort(res.data))
  }, [])
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
  const handleDelete = e => {
    if(modal){
        axios
          .delete(`${API}/tweets/${short.id}`)
          .then(_ => navigate(`/${userId}/shorts`))
    }else{
        setModal(true)
    }
  }
  
  return (
    <div>
         <button className='back' onClick={() => navigate(`/${userId}/shorts`)}>Back to feed</button>
         {modal&&<Modal handleDelete={handleDelete} short={short} handleClose={()=>setModal(false)}/>}
      {short && (
        <div>
          <h1>{short.title}</h1>
          <span>Posted: {date.date} {date.time} {'\t'} {edited?`| Edited at ${edited.date} ${edited.time}`:null}</span>
          <section>
            <p>{short.body}</p>
          </section>
          <section className="single-btns">
          <button className='edit-btn'
            onClick={() => navigate(`/${userId}/shorts/edit/${short.id}`)}
          >
        EDIT
          </button>
          <button className='delete-btn' id={short.id} onClick={handleDelete}>
            DELETE
          </button>
        </section>
        </div>
      )}
    </div>
  )
}
