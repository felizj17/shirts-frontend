import {useState} from 'react'
import {Routes, Route, Navigate, Outlet, useNavigate} from 'react-router-dom'
import Home from './views/home/Home'
import Navbar from './components/navbar/Navbar'
import Register from './views/auth0/Register'
import NewTweet from './views/forms/NewTweet'
import EditTweet from './views/forms/EditTweet'
import './App.css'

const ProtectedRoute = ({user, redirectPath = '/landing'}) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />
  }

  return <Outlet />
}

function App() {
  const navigate = useNavigate()
  const [user, setUser] = useState()
  const handleSignIn = authUser => {
    setUser(authUser)
    navigate('/')
  }
  const handleSignOut = () => {
    setUser()
    navigate('/landing')
  }
  return (
    <div className='App'>
      <Navbar
        user={user}
        handleSignIn={handleSignIn}
        handleSignOut={handleSignOut}
      />
      <div className='background'></div>

      <main>
        <Routes>
          <Route path='/landing' element={<Register />} />
          <Route element={<ProtectedRoute user={user} />}>
            <Route path='/' element={<Home signedIn={user} />} />
            <Route path='/new' element={<NewTweet />} />
            <Route path='/edit/:id' element={<EditTweet />} />
          </Route>
        </Routes>
      </main>
    </div>
  )
}

export default App
