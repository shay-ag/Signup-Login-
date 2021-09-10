import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import "./App.css";

import Homepage from "./components/HomePage/Homepage";
import Loginpage from "./components/LoginPage/Loginpage";
import Registerpage from "./components/RegisterPage/Registerpage";

const App = () => {

    const [user, setLoginUser] = useState({});

    return(
        <div className="App">
            <Router> 
                <Switch>
                    <Route path="/" exact>
                        {(user && user._id) ? 
                        <Homepage setLoginUser={setLoginUser} userName={user.name} /> : 
                        <Loginpage setLoginUser = {setLoginUser}/>}
                    </Route>
                    <Route path="/register" exact><Registerpage /></Route>
                    <Route path="/login" exact>
                        <Loginpage 
                        setLoginUser = {setLoginUser}
                        />
                    </Route>
                </Switch>
            </Router>
        </div>
    )
};

export default App;