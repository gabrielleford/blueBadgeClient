import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import Navbar from './components/Navbar'
import LoginSignup from './components/LoginSignup'
import Landing from './components/Landing'
import MyProfile from './components/MyProfile'


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sessionToken, setSessionToken] = useState('');

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setSessionToken(localStorage.getItem('token'));
      console.log(`Session token: ${sessionToken}`);
      try {
        fetch('/user/checkToken', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionToken,
            credentials: 'include'
          }
        }).then(result => {
          console.log(result);
          if (result.status == 200) setIsLoggedIn(true)
        })
      } catch (error) {
        console.log(error);
      }
    }

  }, [sessionToken])

  return (
    <>
      <Router>
        <div id='debugStuff'>
          <h5>Debug Stuff</h5>
          <p>Logged In? = {isLoggedIn ? 'true' : 'false'}</p>
          <p><span className='purple'>navbar</span>
            <span className='red'>myProfile</span>
            <span className='blue'>signUp / logIn</span>
            <span className='green'>landing</span></p>
        </div>
        <Navbar isLoggedIn={isLoggedIn} sessionToken={sessionToken} />

        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path='/myProfile' element={<MyProfile sessionToken={sessionToken} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
