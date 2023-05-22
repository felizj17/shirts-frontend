import {useState} from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './views/home/Home'
import Navbar from './components/navbar/Navbar'
import Register from './views/auth0/Register'
import NewTweet from './views/forms/NewTweet'
import EditTweet from './views/forms/EditTweet'
import './App.css'

function App() {
  const [signedIn, setSignedIn] = useState(false)
  const handleSignIn = () => {
    setSignedIn(true)
  }
  return (
    <div className='App'>
      <Navbar signedIn={signedIn} handleSignIn={handleSignIn} />
      <div className='background'></div>

      <main>
        {!signedIn ? (
          <div className='signup-page'>
            <section className='register-section'>
              <Register />
            </section>
            <section>
              
            </section>
          </div>
        ) : (
          <Routes>
            <Route path='/' element={<Home signedIn={signedIn} />} />
            <Route path='/new' element={<NewTweet />} />
            <Route path='/edit/:id' element={<EditTweet />} />
          </Routes>
        )}
      </main>
    </div>
  )
}

export default App
