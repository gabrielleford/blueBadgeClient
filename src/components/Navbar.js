import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import logo from '../assets/instapet_logo.png'

const Navbar = (props) => {

    return (
        <>
            <div id='bg' className='d-flex justify-content-center  align-items-center'>
                <div className='adjust-top me-3'>
                    {props.isLoggedIn ? <Link className='btn btn-pb shadow topbutton pinkPurple' to="/myProfile">profile</Link> : <a className="btn btn-pb shadow invisible">wwww</a>}
                    {props.isLoggedIn ? <a className='btn btn-pb shadow topbutton' onClick={() => props.clearToken()}>log out</a> : <a className="btn btn-pb shadow invisible">wwww</a>}
                </div>
                <div id='logobg' className='shadow'>
                    <Link to="/"><img src={logo} height='60' /></Link>
                </div>
                <div className='adjust-top ms-3'>
                    {!props.isLoggedIn ? <Link to="/login" className='btn btn-pb shadow topbutton'>log in</Link> : ''}
                    {props.isLoggedIn ? <a className='btn btn-pb shadow topbutton invisible'>new post</a> : ''}
                    {props.isLoggedIn ? <Link to="/newPost" className='btn btn-pb shadow topbutton'>new post</Link> : ''}

                </div>
            </div>
            <div id='bg-under'></div>
        </>
    )
}

export default Navbar;