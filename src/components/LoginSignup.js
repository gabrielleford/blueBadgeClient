import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginSignup = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [feedback, setFeedBack] = useState('');
    const [feedbackStatus, setFeedBackStatus] = useState('');

    const register = event => {
        event.preventDefault();
        fetch(`http://localhost:3000/user/register`, {
            method: 'POST',
            body: JSON.stringify({ user: { email: email, password: password } }),
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
                //navigate('/')
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

    return (
        <div id='loginSignup'>
            <h5>Log In / Sign Up</h5>
            <div id='login'>
                <h5>Login</h5>
                <form onSubmit={login}>
                    <label htmlFor='email'>Email</label>
                    <input onChange={(e) => setEmail(e.target.value)} type='email' name='email'></input>
                    <label htmlFor='password'>Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} type='password' name='password'></input>
                    <button type='submit'>Log In</button>
                    {feedback ? <span className={feedbackStatus}>{feedback}</span> : ''}
                </form>
            </div>
            <div id='login'>
                <h5>Sign Up</h5>
                <form onSubmit={register}>
                    <label htmlFor='email'>Email</label>
                    <input onChange={(e) => setEmail(e.target.value)} type='email' name='email'></input>
                    <label htmlFor='password'>Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} type='password' name='password'></input>
                    <button type='submit'>Sign Up</button>
                </form>
            </div>
        </div >
    )
}

export default LoginSignup;