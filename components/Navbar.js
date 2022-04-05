import React from 'react';
import {useContext} from "react";
import {useHistory} from "react-router-dom";
import {NavLink} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

export const Navbar = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history.push("/")
    }

    return (
        <nav>
            <div className="nav-wrapper darken-1" style={{padding:"0 2rem"}}>
                <span className="brand-logo"><b>*F*</b></span>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/create">Sukurti komentarus</NavLink></li>
                    <li><NavLink to="/links">Forumo temos</NavLink></li>

                    <li><a href="/" onClick={logoutHandler}>Išeiti</a></li>
                </ul>
            </div>
        </nav>

    );
};

export default Navbar;