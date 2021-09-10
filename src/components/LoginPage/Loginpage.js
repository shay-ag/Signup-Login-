import React, {useState} from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import './Loginpage.css';

const Loginpage = (props) => {

    const history = useHistory();

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const handleChange = (event) => {
        const { name, value} = event.target;

        setUser( {
            ...user,
            [name] : value
        })
    };

    const login = () => {
        const { email, password } = user;
        if( email && password){
            axios.post('http://localhost:5000/login', user)
            .then( (res) => {
                alert(res.data.message);
                props.setLoginUser(res.data.user);
                history.push("/");
            });
        } else{
            alert('Invalid Entry');
        }
        
    }

    return(
        <div className="login">
            <h1>Login!</h1>
            <input type="email" name="email" value={user.email} placeholder="Enter Your Email" onChange={handleChange}/>
            <input type="password" name="password" value={user.password} placeholder="Enter Your Registered Email" onChange={handleChange}/>
            <div className="button" onClick={login} >Login</div>
            <div>or</div>
            <div className="button" onClick={ () => history.push("/register")} >Register</div>
        </div>
    )
};

export default Loginpage;