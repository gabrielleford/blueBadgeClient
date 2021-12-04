import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import Navbar from './components/Navbar'
import LoginSignup from './components/LoginSignup'
import Landing from './components/Landing'
import MyProfile from './components/MyProfile'
import CreatePost from './components/CreatePost';
import PostById from './components/PostById';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sessionToken, setSessionToken] = useState('');
  const [userID, setUserID] = useState('');
  const [username, setUsername] = useState('');
  const [userLikedPosts, setUserLikedPosts] = useState([])
  //const fetchUrl = "https://gfks-instapet.herokuapp.com"
  const fetchUrl = "http://localhost:3000"

  const fetchData = async () => {
    if (localStorage.getItem('Authorization')) {
      setSessionToken(localStorage.getItem('Authorization'));
      if (sessionToken !== '') await fetch(`${fetchUrl}/user/checkToken`, {
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
          console.log(userID);
        })
        .catch((error) => console.log(error))

      if (sessionToken !== '') await fetch(`${fetchUrl}/user/likes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionToken,
        },
      })
        .then((result) => result.json())
        .then((result) => {
          setUserLikedPosts(result[0].likedPosts);
        })
        .catch((error) => console.log(error));
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
    //console.log(userLikedPosts)
  }, [sessionToken, isLoggedIn])

  return (
    <>
      <Router>
        <div id="debugStuff">
          <h5>Debug Stuff</h5>
          <p>Logged In? = {isLoggedIn ? "true" : "false"}</p>
          <p>SessionToken = {sessionToken}</p>
          <p>user_id = {userID}</p>
          <p>username = {username}</p>
        </div>
        <Navbar
          clearToken={clearToken}
          isLoggedIn={isLoggedIn}
          sessionToken={sessionToken}
          setSessionToken={setSessionToken}
        />

        <Routes>
          <Route
            path="/"
            element={
              <Landing
                fetchUrl={fetchUrl}
                fetchData={fetchData}
                sessionToken={sessionToken}
                userLikedPosts={userLikedPosts}
              />
            }
          />
          <Route
            path="/login"
            element={
              <LoginSignup
                fetchUrl={fetchUrl}
                updateToken={updateToken}
                setSessionToken={setSessionToken}
                sessionToken={sessionToken}
              />
            }
          />
          <Route
            path="/myProfile"
            element={
              <MyProfile
                fetchUrl={fetchUrl}
                username={username}
                userID={userID}
                sessionToken={sessionToken}
                userLikedPosts={userLikedPosts}
              />
            }
          />
          <Route
            path="/newPost"
            element={<CreatePost 
              fetchUrl={fetchUrl}
              sessionToken={sessionToken} />}
          />
          <Route
            path="/post/:id"
            element={<PostById 
              fetchUrl={fetchUrl}
              userID={userID}
              sessionToken={sessionToken} />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
