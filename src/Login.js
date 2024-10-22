import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prevCredentials => ({ ...prevCredentials, [name]: value }));
    };

    const handleLogin = async () => {
        const { username, password } = credentials;

        if (!username || !password) {
            setError('Wszystkie pola są wymagane!');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/user/login', credentials);
            if (response.status === 200) {
                localStorage.setItem('userRole', response.data);

                switch (response.data) {
                    case "Pacjent":
                        navigate('/add-canteen-menu');
                        break;
                    case "Pracownik":
                        navigate('/add-canteen-menu');
                        break;
                    case "Admin":
                        navigate('/add-medical-staff');
                        break;
                    default:
                        setError('Nieznana rola użytkownika');
                        break;
                }
            }
        } catch (error) {
            console.error('Błąd logowania:', error.response || error);
            if (error.response) {
                setError(`Błąd ${error.response.status}: ${error.response.data}`);
            } else {
                setError('Wystąpił błąd podczas logowania');
            }
        }
    };


    return (
        <div className="login-form-container">
            <h1>Zaloguj się</h1>
            {error && <p className="error-message">{error}</p>}

            <input
                type="text"
                name="username"
                placeholder="Nazwa użytkownika"
                value={credentials.username}
                onChange={handleChange}
            />

            <input
                type="password"
                name="password"
                placeholder="Hasło"
                value={credentials.password}
                onChange={handleChange}
            />

            <button onClick={handleLogin}>Zaloguj się</button>
        </div>
    );
}

export default Login;
