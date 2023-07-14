import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import '../styles/Login.css'

const SignIn = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        localStorage.setItem('username', username)
    }, [username])

    let { signInUser } = useContext(UserContext);
    let navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        signInUser(username, password).then(() => {
            navigate('/');
        }).catch(error => {
            console.log(error);
            window.alert('Try again! : Failed login');
        });
    }

    return (
        <form onSubmit={handleSubmit}>
        <div className='login-container'>
            <h1>Login</h1>
            
            <span className='form-label'>Username  </span>
            <input classname='form-input' placeholder="Enter username" type="text" name="username" onChange={e => setUsername(e.target.value)} autoComplete="off" />
            <br></br><br></br>
            <span className='form-label'>Password  </span>
            <input classname='form-input' placeholder="Enter password" type="password" name="password" onChange={e => setPassword(e.target.value)} />
            <br /><br></br>
            
            <button>
                Sign In
            </button>
            </div>
        </form>
    );
};

export default SignIn;