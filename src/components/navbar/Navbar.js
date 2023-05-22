import { useEffect, useState } from "react"
import {  useLocation } from "react-router-dom"
import Login from "../../views/auth0/Login"
import './navbar.css'
export default function Navbar({user, handleSignIn, handleSignOut}) {
    const location = useLocation()
    const [show, setShow] = useState(true)
    useEffect(()=>{
        if(location.pathname === '/new'){
            setShow(false)
        }else{setShow(true)}
    },[location])
  return (
    <nav>
      <h1 id='title'>Shorts</h1>
      <aside className='login-btns'>
        {}
        {!user?
          (<>
            <Login handleSignin={handleSignIn}/>
          </>):show&&<button onClick={handleSignOut}>Logout</button>
        }
      </aside>
    </nav>
  )
}
