import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import Navbar from './components/Navbar'
import LoginSignup from './components/LoginSignup'
import Landing from './components/Landing'
import MyProfile from './components/MyProfile'
import CreatePost from './components/CreatePost';


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sessionToken, setSessionToken] = useState('');
  const [userID, setUserID] = useState('');

  const updateToken = (newToken) => {
    localStorage.setItem('Authorization', newToken);
    setSessionToken(newToken);
  }

  const clearToken = () => {
    localStorage.clear();
    setSessionToken('');
    setIsLoggedIn(false);
  }

  useEffect(() => {
    if (localStorage.getItem('Authorization')) {
      setSessionToken(localStorage.getItem('Authorization'));
      try {
        fetch('http://localhost:3000/user/checkToken', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionToken,
            credentials: 'include'
          }
        }).then(result => {
          if (result.status == 200) {
            setIsLoggedIn(true)
          }
          else setIsLoggedIn(false);
          return result.json()
        }).then(result => { setUserID(result.user_id); }
        )
      } catch (error) {
        console.log(error);
      }
    }
    else setIsLoggedIn(false);

  }, [sessionToken, isLoggedIn])

  return (
    <>
      <Router>
        <div id='debugStuff'>
          <h5>Debug Stuff</h5>
          <p>Logged In? = {isLoggedIn ? 'true' : 'false'}</p>
          <p>SessionToken = {sessionToken}</p>
          <p>user_id = {userID}</p>
        </div>
        <Navbar clearToken={clearToken} isLoggedIn={isLoggedIn} sessionToken={sessionToken} setSessionToken={setSessionToken} />

        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<LoginSignup updateToken={updateToken} setSessionToken={setSessionToken} sessionToken={sessionToken} updateToken={updateToken} />} />
          <Route path='/myProfile' element={<MyProfile sessionToken={sessionToken} />} />
          <Route path="/newPost" element={<CreatePost sessionToken={sessionToken} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
