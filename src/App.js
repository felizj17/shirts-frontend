import {useState} from 'react'
import {Routes, Route, Navigate, Outlet, useNavigate} from 'react-router-dom'
import Home from './views/home/Home'
import Navbar from './components/navbar/Navbar'
import Register from './views/auth0/Register'
import NewTweet from './views/forms/NewTweet'
import EditTweet from './views/forms/EditTweet'
import NotFound from './views/NotFound'
import './App.css'
import Short from './views/singleview/Short'

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
    navigate(`/${authUser.id}/shorts`)
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
            <Route path='/:userId/shorts' element={<Home user={user} />} />
            <Route path='/:userId/shorts/:id' element={<Short user={user} />} />
            <Route path='/:userId/shorts/edit/:id' element={<EditTweet user={user} />} />
            <Route path='/:userId/shorts/new' element={<NewTweet user={user}/>} />
          </Route>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </main>
    </div>
  )
}

export default App
