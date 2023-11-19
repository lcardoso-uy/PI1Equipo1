import React, { useState, useContext } from 'react';
import { DataContext } from '../Context/DataContext';
import { useNavigate } from 'react-router-dom';
import './User.css';

const IniciarSesion = () => {
    const navigate = useNavigate();
    const { iniciarSesion } = useContext(DataContext);
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
            const response = await fetch('http://localhost:8080/auth/generateToken', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credenciales)
            });

            if (response.ok) {
                const token = await response.text();
                localStorage.setItem('authToken', token);
                const userInfoResponse = await fetch('http://localhost:8080/auth/getUserInfo', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
 
                if (userInfoResponse.ok) {
                    const usuarioData = await userInfoResponse.json();
                    iniciarSesion(usuarioData);
                    navigate('/');
                } else {
                    throw new Error("No se pudo obtener la información del usuario");
                }
            } else {
                setError("Correo electrónico o contraseña incorrectos");
            }
        } catch (err) {
            console.error('Error during login:', err);
            setError("Error en el servidor");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin();
    };

    return (
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
    );
};

export default IniciarSesion;