import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import './Registerpage.css';

const Registerpage = () => {

    const history = useHistory();

    const [ user, setUser ] = useState({
        name: "",
        email: "",
        password: "",
        reenterpassword: ""
    })

    const handleChange = (event) => {
        const { name, value } = event.target;

        setUser( {
            ...user,
            [name] : value
        })
    };

    const register = () => {
        const { name, email, password, reenterpassword } = user;
        if( name && email && password && (password === reenterpassword)){
            axios.post('http://localhost:5000/register', user)
            .then( res => {
                alert(res.data.message);
                history.push('/login');
            });
        } else{
            alert('Invalid Entry');
        }
    }

    return(
        <div className="register">
            <h1>Register!</h1>
            <input type="text" name="name" value={user.name} placeholder="Enter Your Name" onChange={handleChange} />
            <input type="email" name="email" value={user.email} placeholder="Enter Your Email" onChange={handleChange} />
            <input type="password" name="password" value={user.password} placeholder="Enter Your Password" onChange={handleChange} />
            <input type="password" name="reenterpassword" value={user.reenterpassword} placeholder="Re-enter Your Password" onChange={handleChange} />
            <div className="button" onClick={register} >Register</div>
            <div>or</div>
            <div className="button" onClick={ () => { history.push('/login')}} >Login</div>
        </div>
    )
};

export default Registerpage;