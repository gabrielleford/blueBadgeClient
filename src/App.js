import APIURL from './helpers/environment'
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";
import './App.css';
import Navbar from './components/Navbar'
import LoginSignup from './components/LoginSignup'
import Landing from './components/Landing'
import MyProfile from './components/MyProfile'
import CreatePost from './components/CreatePost';
import PostById from './components/PostById';
import UserProfile from './components/UserProfile';
import MyProfileDisplay from './components/MyProfileDisplay';


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sessionToken, setSessionToken] = useState('');
  const [userID, setUserID] = useState('');
  const [username, setUsername] = useState('');
  const [userLikedPosts, setUserLikedPosts] = useState([])
  const [text, setText] = useState('');
  const [toastMode, setToastMode] = useState('success');

  const fetchData = async () => {
    if (localStorage.getItem('Authorization')) {
      setSessionToken(localStorage.getItem('Authorization'));
      if (sessionToken !== '') await fetch(`${APIURL}/user/checkToken`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionToken,
        }
      }).then(result => {
        if (result.status == 200) {
          setIsLoggedIn(true)
        }
        else setIsLoggedIn(false);
        return result.json()
      })
        .then(result => {
          setUserID(result.user_id);
          setUsername(result.username);
        })
        .catch((error) => console.log(error))

      if (sessionToken !== '') await fetch(`${APIURL}/user/likes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionToken,
        }
      })
        .then(result => result.json())
        .then(result => { setUserLikedPosts(result[0].likedPosts); })
        .catch((error) => console.log(error))
    }
    else setIsLoggedIn(false);
  }

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
    fetchData();
    console.log(userLikedPosts)
  }, [sessionToken, isLoggedIn])

  return (
    <>
      <Router>
        <div id='main' className='container-fluid'>
          <Navbar
            clearToken={clearToken}
            isLoggedIn={isLoggedIn}
            sessionToken={sessionToken}
            setSessionToken={setSessionToken}

          />

          <Routes>
            <Route path="/" element={
              <Landing
                fetchData={fetchData}
                sessionToken={sessionToken}
                userLikedPosts={userLikedPosts}
                isLoggedIn={isLoggedIn}
              />}
            />
            <Route path="/login" element={
              <LoginSignup
                updateToken={updateToken}
                setSessionToken={setSessionToken}
                sessionToken={sessionToken}
              />}
            />
            <Route path='/myProfile' element={
              <MyProfile
                username={username}
                userID={userID}
                sessionToken={sessionToken}
                userLikedPosts={userLikedPosts}
                fetchData={fetchData}
                isLoggedIn={isLoggedIn}
              />}
            />
            <Route path="/newPost" element={
              <CreatePost
                sessionToken={sessionToken}
              />}
            />
            <Route path="/post/:id" element={
              <PostById
                userID={userID}
                isLoggedIn={isLoggedIn}
                sessionToken={sessionToken}
                userID={userID}
                userLikedPosts={userLikedPosts}
                fetchData={fetchData}
              />}
            />
            <Route path="/user/:username" element={
              <UserProfile
                isLoggedIn={isLoggedIn}
                sessionToken={sessionToken}
                username={username}
                userLikedPosts={userLikedPosts}
                fetchData={fetchData}
              />}
            />
          </Routes>
          <footer>
            <p>Created by <a href='https://github.com/gabrielleford' target='_blank'>Gabrielle Ford</a> and <a href='https://github.com/ksallows' target='_blank'>Katie Sallows</a></p>
          </footer>
        </div>
      </Router>
    </>
  );
}

export default App;
