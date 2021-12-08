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
        let responseCode;
        event.preventDefault();
        fetch(`${props.fetchUrl}/user/register`, {
            method: 'POST',
            body: JSON.stringify({ user: { email: email, password: password, username: username } }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                setFeedBackStatus(`s${response.status}`)
                responseCode = response.status
                return response.json();
            })
            .then((data) => {
                props.updateToken(data.sessionToken);
                setFeedBack(data.message);
                if (responseCode == '201') navigate('/')
            })
    }

    const login = event => {
        let responseCode;
        event.preventDefault();
        fetch(`${props.fetchUrl}/user/login`, {
            method: 'POST',
            body: JSON.stringify({ user: { email: email, password: password } }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                setFeedBackStatus(`s${response.status}`)
                responseCode = response.status
                return response.json();
            })
            .then((data) => {
                props.updateToken(data.sessionToken);
                setFeedBack(data.message);
                if (responseCode == '200') navigate('/')
            })
    }

    useEffect(() => {
        if (activeTab == 'login') {
            document.getElementById('signup').style.display = 'none';
            document.getElementById('login').style.display = 'flex';
            console.log('login')
        }
        if (activeTab == 'signup') {
            document.getElementById('login').style.display = 'none'
            document.getElementById('signup').style.display = 'flex';
            console.log('signup')
        }

    }, [activeTab])

    return (
        <>
            <div id='login' style={{ display: 'none' }} className='row justify-content-center'>
                <div className='col-sm-10 col-lg-5'>
                    <div className='with-bg'>
                        <h1>login</h1>
                        <form onSubmit={login}>
                            <input className='input' onChange={(e) => setEmail(e.target.value)} id='loginEmail' type='email' placeholder='email' />
                            <input className='input' onChange={(e) => setPassword(e.target.value)} id='loginPassword' type='password' placeholder='password' />
                            <button type='submit' id='loginSubmit' className='btn-pb pinkPurple shadow'>log in</button>
                        </form>
                        <a id='signupSwitcher' onClick={() => setActiveTab('signup')} className='mt-2'>sign up &raquo;</a>
                    </div>
                </div>
            </div>
            <div id='signup' style={{ display: 'flex' }} className='row justify-content-center'>
                <div className='col-sm-10 col-lg-5'>
                    <div className='with-bg'>
                        <h1>sign up</h1>
                        <form onSubmit={register}>
                            <input className='input' onChange={(e) => setEmail(e.target.value)} id='registerEmail' type='email' placeholder='email' />
                            <input className='input' onChange={(e) => setUsername(e.target.value)} id='registerUsername' type='text' placeholder='username' />
                            <input className='input' onChange={(e) => setPassword(e.target.value)} id='registerPassword' type='password' placeholder='password' />
                            <button type='submit' id='registerSubmit' className='btn-pb pinkPurple shadow'>sign up</button>
                        </form>
                        <a id='loginSwitcher' onClick={() => setActiveTab('login')} className='mt-2'>&laquo; log in</a>
                    </div>
                </div>
            </div>

        </>
        // <div id='loginSignup'>
        //     <h5>Log In / Sign Up</h5>
        //     {feedback ? <div className={feedbackStatus}>{feedback}</div> : ''}
        //     <div id='loginSwitcher' className='active toggler' onClick={() => setActiveTab('login')}>
        //         Log In
        //     </div>
        //     <div id='signupSwitcher' className='notActive toggler' onClick={() => setActiveTab('signup')}>
        //         Sign Up
        //     </div>
        //     <div id='login'>
        //         <h5>Login</h5>
        //         <form onSubmit={login}>
        //             <label htmlFor='email'>Email</label>
        //             <input onChange={(e) => setEmail(e.target.value)} type='email' name='email'></input>
        //             <label htmlFor='password'>Password</label>
        //             <input onChange={(e) => setPassword(e.target.value)} type='password' name='password'></input>
        //             <button type='submit'>Log In</button>
        //         </form>
        //     </div>
        //     <div id='signup'>
        //         <h5>Sign Up</h5>
        //         <form onSubmit={register}>
        //             <label htmlFor='email'>Email</label>
        //             <input onChange={(e) => setEmail(e.target.value)} type='email' name='email'></input>
        //             <label htmlFor='email'>Username</label>
        //             <input onChange={(e) => setUsername(e.target.value)} type='text' name='username'></input>
        //             <label htmlFor='password'>Password</label>
        //             <input onChange={(e) => setPassword(e.target.value)} type='password' name='password'></input>
        //             <button type='submit'>Sign Up</button>
        //         </form>
        //     </div>
        // </div >
    )
}

export default LoginSignup;