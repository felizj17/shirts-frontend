import {useEffect, useState} from 'react'
import axios from 'axios'
import Tweet from './Tweet'
import { useLocation } from 'react-router-dom'
const API = process.env.REACT_APP_API_URL
export default function Feed({user}){
    const location = useLocation()
    const [tweets, setTweets] = useState([])
    const [errors, setErrors] = useState({})
    useEffect(()=>{
        axios.get(`${API}/tweets/`)
        .then(res=>setTweets(res.data))
        .catch(e=>setErrors(e))
    },[location])
    return (
        <section className='feed'>
            {/* {errors.error&&<ErrorMessage error={errors.error}/>} */}
            {tweets&&
            tweets.map(tweet=>(
                <Tweet key={`tweet-${tweet.id}`} tweet={tweet}/>
            ))}
            {console.log(tweets)}
        </section>
    )
}