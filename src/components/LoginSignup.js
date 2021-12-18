import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import APIURL from '../helpers/environment'
import formValidation from './formValidation';

const LoginSignup = (props) => {
    const {handleChange, values, register, login, errors} = useForm(props, formValidation);
    const [activeTab, setActiveTab] = useState('login');

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
                            <input className='input' onChange={handleChange} value={values.email} id='loginEmail' name='email' type='email' placeholder='email' />
                            <input className='input' onChange={handleChange} value={values.password} id='loginPassword' name='password' type='password' placeholder='password' />
                            {errors.error && <p className='error'>{errors.error}</p>}
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
                            <input className='input' onChange={handleChange} value={values.email} id='registerEmail' name='email' type='email' placeholder='email' />
                            {errors.email && <p className='error'>{errors.email}</p>}
                            <input className='input' onChange={handleChange} value={values.username} id='registerUsername' name='username' type='text' placeholder='username' />
                            {errors.username && <p className='error'>{errors.username}</p>}
                            <input className='input' onChange={handleChange} value={values.password} id='registerPassword' name='password' type='password' placeholder='password' />
                            {errors.password && <p className='error'>{errors.password}</p>}
                            <button type='submit' id='registerSubmit' className='btn-pb pinkPurple shadow'>sign up</button>
                        </form>
                        <a id='loginSwitcher' onClick={() => setActiveTab('login')} className='mt-2'>&laquo; log in</a>
                    </div>
                </div>
            </div>

        </>
    )
}

const useForm = (props, formValidation) => {
    const [values, setValues] = useState({
        email: '',
        username: '',
        password:''
    })
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    let what;
    let responseCode;

    const handleChange = e => {
        const {name, value} = e.target;
        setValues({
            ...values,
            [name]: value
        });
    }

    const register = async (event) => {
      event.preventDefault();
      await fetch(`${APIURL}/user/register`, {
        method: "POST",
        body: JSON.stringify({
          user: { email: values.email, password: values.password, username: values.username.trim() },
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          what = "register";
          responseCode = response.status;
          return response.json();
        })
        .then((data) => {
          setErrors(formValidation(values, responseCode, what));
          if (typeof data.sessionToken != 'undefined') props.updateToken(data.sessionToken);
          props.updateToken(data.sessionToken);
          if (responseCode == "201") navigate("/");
        });
    };

    const login = async (event) => {
      event.preventDefault();
      await fetch(`${APIURL}/user/login`, {
        method: "POST",
        body: JSON.stringify({ user: { email: values.email, password: values.password } }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          what = 'login';
          responseCode = response.status;
          return response.json();
        })
        .then((data) => {
          setErrors(formValidation(values, responseCode, what));
          if (typeof data.sessionToken != 'undefined') props.updateToken(data.sessionToken);
          props.updateToken(data.sessionToken);
          if (responseCode == "200") navigate("/");
        });
    };

    return {handleChange, values, register, login, errors}
}

export default LoginSignup;