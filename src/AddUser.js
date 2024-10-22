import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddUser.css';
import withAuth from './withAuth';

function AddUser() {
    const [user, setUser] = useState({
        username: '',
        userType: 'Pacjent',
        password: '',
        medicalStaff: {
            firstName: '',
            lastName: '',
            role: '',
            department: '',
        }
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleAddUser = async () => {
        const { username, userType, password, medicalStaff } = user;

        if (!username || !userType || !password || !medicalStaff.firstName || !medicalStaff.lastName || !medicalStaff.role || !medicalStaff.department) {
            setError('Wszystkie pola są wymagane!');
            return;
        }

        try {
            await axios.post('http://localhost:8080/api/user/createWithStaff', user);
            setUser({
                username: '',
                userType: 'Pacjent',
                password: '',
                medicalStaff: {
                    firstName: '',
                    lastName: '',
                    role: '',
                    department: '',
                }
            });
            alert('Użytkownik i pracownik medyczny dodani pomyślnie!');
            navigate('/');
        } catch (error) {
            console.error('Błąd podczas dodawania użytkownika:', error);
            setError('Nie udało się dodać użytkownika');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleStaffChange = (e) => {
        const { name, value } = e.target;
        setUser(prevUser => ({
            ...prevUser,
            medicalStaff: {
                ...prevUser.medicalStaff,
                [name]: value,
            }
        }));
    };

    return (
        <div className="user-form-container">
            <h1>Dodaj Użytkownika</h1>
            {error && <p>{error}</p>}

            <input
                type="text"
                name="username"
                placeholder="Nazwa użytkownika"
                value={user.username}
                onChange={handleChange}
            />

            <label htmlFor="userType">Typ użytkownika:</label>
            <select
                name="userType"
                value={user.userType}
                onChange={handleChange}
                id="userType"
            >
                <option value="Pacjent">Pacjent</option>
                <option value="Pracownik">Pracownik</option>
                <option value="Admin">Admin</option>
            </select>

            <input
                type="password"
                name="password"
                placeholder="Hasło"
                value={user.password}
                onChange={handleChange}
            />

            <h2>Informacje o Pracowniku Medycznym</h2>
            <input
                type="text"
                name="firstName"
                placeholder="Imię Pracownika"
                value={user.medicalStaff.firstName}
                onChange={handleStaffChange}
            />

            <input
                type="text"
                name="lastName"
                placeholder="Nazwisko Pracownika"
                value={user.medicalStaff.lastName}
                onChange={handleStaffChange}
            />

            <input
                type="text"
                name="role"
                placeholder="Rola Pracownika"
                value={user.medicalStaff.role}
                onChange={handleStaffChange}
            />

            <input
                type="text"
                name="department"
                placeholder="Departament Pracownika"
                value={user.medicalStaff.department}
                onChange={handleStaffChange}
            />

            <button onClick={handleAddUser}>Dodaj Użytkownika</button>
        </div>
    );
}

export default withAuth(AddUser, ['Admin']);
