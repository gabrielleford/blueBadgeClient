import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import Navbar from './components/Navbar'
import LoginSignup from './components/LoginSignup'
import Landing from './components/Landing'


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {

  }, [])

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<LoginSignup />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
