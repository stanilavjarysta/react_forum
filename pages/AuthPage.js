import React, {useContext, useEffect} from 'react';
import {useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";

const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, request, error, clearError} = useHttp()
    const [form, setForm] = useState({
        email: "", password: ""
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect( ()=>{
        window.M.updateTextFields()
    }, [])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
          message(data.message)
        } catch (e) {}
}

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
        } catch (e) {}
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3 ">
            <h4>KOMENTUOK</h4>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title"><b>PRISIJUNGIMAS</b></span>
                        <div>
                            <div className="input-field">
                                <input
                                    placeholder="Įveskyte el. pasto adressą"
                                    id="email"
                                    type="text"
                                    name="email"
                                    className="yellow-input"
                                    onChange={changeHandler}
                                />
                                    <label htmlFor="email">El. pasto adresas</label>
                            </div>
                            <div className="input-field">
                                <input
                                    placeholder="Įveskyte slaptažodį"
                                    id="password"
                                    type="password"
                                    name="password"
                                    className="yellow-input"
                                    onChange={changeHandler}
                                />
                                <label htmlFor="email">Slaptažodys</label>

                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className="btn yellow darken-4"
                                style={{marginRight: 10}}
                            disabled={loading}
                            onClick={loginHandler}
                        >Įeiti</button>
                       <button
                           className="btn grey lighten-1 black-text"
                           onClick={registerHandler}
                           disabled={loading}
                       >Registracija</button>
                    </div>
                </div>
               </div>
            <img src="https://media.istockphoto.com/photos/cocker-puppy-sitting-looking-at-the-camera-isolated-on-white-picture-id483770579?b=1&k=20&m=483770579&s=170667a&w=0&h=1w6XIsJktTxyiMgiijcFGqlu-cQB5vM0N9MSAGxiyrw=" alt=""/>
        </div>
    );
};

export default AuthPage;