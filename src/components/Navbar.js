import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const Navbar = (props) => {

    return (
        <div id='navbar'>
            <h5>Navbar</h5>
            <Link to="/">Landing (Home)</Link>
            {!props.isLoggedIn ? <Link to="/login">Login</Link> : ''}
            {props.isLoggedIn ? <Link to="/myProfile">My Profile</Link> : ''}
            {props.isLoggedIn ? <a onClick={props.clearToken}>Logout</a> : ''}
        </div>
    )
}

export default Navbar;