import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import logo from '../assets/instapet_logo.png'

const Navbar = (props) => {

    return (
        <>
            <div id='bg' className='d-flex justify-content-center  align-items-center'>
                <div className='adjust-top me-3 d-flex justify-content-center'>
                    {props.isLoggedIn ? <Link className='btn btn-pb shadow topbutton pinkPurple' to="/myProfile">profile</Link> : <a className="btn btn-pb shadow invisible">wwww</a>}
                </div>
                <div className='logo-bg-container'>
                    <div id='logobg' className='shadow'>
                        <Link to="/"><img src={logo} height='60' /></Link>
                    </div>
                </div>
                <div className='adjust-top ms-3 d-flex justify-content-center'>
                    {!props.isLoggedIn ? <Link to="/login" className='btn btn-pb shadow topbutton'>log in</Link> : ''}
                    {props.isLoggedIn ? <a className='btn btn-pb shadow topbutton' onClick={() => props.clearToken()}>log out</a> : <a className="btn btn-pb shadow invisible">wwww</a>}
                </div>
            </div>
            <div id='bg-under'></div>
            {props.isLoggedIn ? <Link to="/newPost" id='new-post' className='btn btn-pb topbutton'>new post</Link> : ''}
        </>
    )
}

export default Navbar;