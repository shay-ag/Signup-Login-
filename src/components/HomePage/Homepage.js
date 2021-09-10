import React from 'react';

import "./Homepage.css";

const Homepage = (props) => {

    const logout = () => {
        props.setLoginUser({});
    } 

    return(
        <div className="homepage">
            <h1>Hello, {props.userName}</h1>
            <div className="button" onClick={logout}>Logout</div>
        </div>
    )
};

export default Homepage;