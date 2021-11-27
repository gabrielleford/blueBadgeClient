import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginSignup = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    const [feedback, setFeedBack] = useState('');
    const [feedbackStatus, setFeedBackStatus] = useState('');
    const [activeTab, setActiveTab] = useState('login');

    const register = event => {
        event.preventDefault();
        fetch(`http://localhost:3000/user/register`, {
            method: 'POST',
            body: JSON.stringify({ user: { email: email, password: password, username: username } }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                setFeedBackStatus(`s${response.status}`)
                return response.json();
            })
            .then((data) => {
                props.updateToken(data.sessionToken);
                setFeedBack(data.message);
                if (data.response == '200') navigate('/')
            })
    }

    const login = event => {
        event.preventDefault();
        fetch("http://localhost:3000/user/login", {
            method: 'POST',
            body: JSON.stringify({ user: { email: email, password: password } }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                setFeedBackStatus(`s${response.status}`);
                return response.json();
            })
            .then((data) => {
                props.updateToken(data.sessionToken);
                setFeedBack(data.message);
                if (data.response == '200') navigate('/')
            })
    }

    useEffect(() => {
        if (activeTab == 'login') {
            document.getElementById('signup').style.display = 'none';
            document.getElementById('login').style.display = 'block';
            document.getElementById('loginSwitcher').classList.remove('notActive');
            document.getElementById('loginSwitcher').classList.add('active');
            document.getElementById('signupSwitcher').classList.remove('active');
            document.getElementById('signupSwitcher').classList.add('notActive');
        }
        if (activeTab == 'signup') {
            document.getElementById('login').style.display = 'none'
            document.getElementById('signup').style.display = 'block';
            document.getElementById('signupSwitcher').classList.remove('notActive');
            document.getElementById('signupSwitcher').classList.add('active');
            document.getElementById('loginSwitcher').classList.remove('active');
            document.getElementById('loginSwitcher').classList.add('notActive');
        }

    }, [activeTab])

    return (
        <div id='loginSignup'>
            <h5>Log In / Sign Up</h5>
            {feedback ? <div className={feedbackStatus}>{feedback}</div> : ''}
            <div id='loginSwitcher' className='active toggler' onClick={() => setActiveTab('login')}>
                Log In
            </div>
            <div id='signupSwitcher' className='notActive toggler' onClick={() => setActiveTab('signup')}>
                Sign Up
            </div>
            <div id='login'>
                <h5>Login</h5>
                <form onSubmit={login}>
                    <label htmlFor='email'>Email</label>
                    <input onChange={(e) => setEmail(e.target.value)} type='email' name='email'></input>
                    <label htmlFor='password'>Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} type='password' name='password'></input>
                    <button type='submit'>Log In</button>
                </form>
            </div>
            <div id='signup'>
                <h5>Sign Up</h5>
                <form onSubmit={register}>
                    <label htmlFor='email'>Email</label>
                    <input onChange={(e) => setEmail(e.target.value)} type='email' name='email'></input>
                    <label htmlFor='email'>Username</label>
                    <input onChange={(e) => setUsername(e.target.value)} type='text' name='username'></input>
                    <label htmlFor='password'>Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} type='password' name='password'></input>
                    <button type='submit'>Sign Up</button>
                </form>
            </div>
        </div >
    )
}

export default LoginSignup;