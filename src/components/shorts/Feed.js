import {useEffect, useState} from 'react'
import axios from 'axios'
import Shorts from './Shorts'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
const API = process.env.REACT_APP_API_URL
export default function Feed({user}){
    const location = useLocation()
    const {userId} = useParams()
    const navigate = useNavigate()
    const [shorts, setShorts] = useState([])
    const [errors, setErrors] = useState({})
    useEffect(()=>{
        axios.get(`${API}/users/${userId}/shorts/`)
        .then(res=>setShorts(res.data))
        .catch(e=>setErrors(e))
    },[location])
    return (
        <section className='feed'>
            {/* {errors.error&&<ErrorMessage error={errors.error}/>} */}
            {shorts.length>0?
            shorts.map(short=>(
                <Shorts key={`tweet-${short.id}`} shorts={short}/>
            )):<h1>You have no shorts yet, <Link to={`/${user.id}/shorts/new`}>Add one</Link> </h1>}
            {/* <button onClick={()=>navigate(`/${userId}/shorts/new`)} >Add Short</button> */}
        </section>
    )
}