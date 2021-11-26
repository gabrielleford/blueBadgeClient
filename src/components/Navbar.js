import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const Navbar = (props) => {

    return (
        <div id='navbar'>
            <Link to="/">Landing (Home)</Link>
            <Link to="/login">Login</Link>
            {props.isLoggedIn ? <Link to="/myProfile">My Profile</Link> : ''}
        </div>
    )
}

export default Navbar;