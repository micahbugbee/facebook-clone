import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import '../styles/Register.css'

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");

    let { createUser } = useContext(UserContext);
    let navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        createUser(username, password, firstName, lastName, age, city, state).then(() => {
            navigate('/login');
            window.alert('New account created!')
        }).catch(error => {
            console.log(error);
            window.alert('Try again: registration failed!');
        });
    }

    return (
        
        <form onSubmit={handleSubmit}>
        <div className='register-container'>
            <h1>Register</h1>
            <br></br>
            
            <span className='form-label'>Username  </span>
            <input className='form-input' placeholder="Enter Username" type="text" name="username" value={username} onChange={e => setUsername(e.target.value)} autoComplete="off" />
            <br></br><br></br>
            <span className='form-label'>Password  </span>
            <input className='form-input' placeholder="Enter Password" type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
            <br /><br></br>
            <span className='form-label'>First Name  </span>
            <input className='form-input' placeholder="Enter First name" type="text" name="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} autoComplete="off" />
            <br></br><br></br>
            <span className='form-label'>Last Name  </span>
            <input className='form-input' placeholder="Enter Last Name" type="text" name="lastName" value={lastName} onChange={e => setLastName(e.target.value)} autoComplete="off" />
            <br></br><br></br>
            <span className='form-label'>Age  </span>
            <input className='form-input' placeholder="Enter Age" type="text" name="age" value={age} onChange={e => setAge(e.target.value)} autoComplete="off" />
            <br></br><br></br>
            <span className='form-label'>City  </span>
            <input className='form-input' placeholder="Enter City" type="text" name="city" value={city} onChange={e => setCity(e.target.value)} autoComplete="off" />
            <br></br><br></br>
            <span className='form-label'>State  </span>
            <input className='form-input' placeholder="Enter State" type="text" name="state" value={state} onChange={e => setState(e.target.value)} autoComplete="off" />
            <br></br><br></br>
            
            <button>Register Account</button>
            </div>
        </form>
        
    )
};

export default SignUp;