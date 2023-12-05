import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import './User.css';
import { AuthContext } from '../Context/AuthContext';


const IniciarSesion = () => {
    const navigate = useNavigate();
    const { iniciarSesion } = useContext(AuthContext);
    const [credenciales, setCredenciales] = useState({
        username: "",
        password: ""
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredenciales({
            ...credenciales,
            [name]: value
        });
    };

    const handleLogin = async () => {
        try {
            await iniciarSesion(credenciales); 
            navigate('/'); 
        } catch (error) {
            setError(error.message || "Error durante el inicio de sesión");
        }
    };
    

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin();
    };

    return (
        <div className='inicio-sesion__contenedor'>
        <form onSubmit={handleSubmit} className="form__login">
            <fieldset className="form__login-fieldset">
                <legend>Iniciar Sesión</legend>

                <div className="form__login-field">
                    <label htmlFor="username">Username:</label>
                    <input
                        id="username"
                        type="email"
                        name="username"
                        className="form__login-input"
                        value={credenciales.username}
                        onChange={handleChange}
                    />
                </div>

                <div className="form__login-field">
                    <label htmlFor="password">Password:</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        className="form__login-input"
                        value={credenciales.password}
                        onChange={handleChange}
                    />
                </div>

                {error && <p className="form__login-mensajeError">{error}</p>}
                <button type="submit" className="form__login-boton">Iniciar Sesión</button>
            </fieldset>
        </form>
        </div>
    );
};

export default IniciarSesion;