import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddMedicalStaff.css';
import withAuth from './withAuth';

function AddPatient() {
    const [patient, setPatient] = useState({
        firstName: '',
        lastName: '',
        birthDate: '',
        roomNumber: ''
    });

    const [user, setUser] = useState({
        username: '',
        password: '',
        userType: 'Pacjent',
        patient: {}
    });

    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleAddPatient = async () => {
        const { firstName, lastName, birthDate, roomNumber } = patient;
        const { username, password } = user;


        if (!firstName || !lastName || !birthDate || !roomNumber) {
            setError('Wszystkie pola pacjenta są wymagane!');
            return;
        }


        if (!username || !password) {
            setError('Wszystkie pola użytkownika są wymagane!');
            return;
        }

        try {

            user.patient = { firstName, lastName, birthDate, roomNumber };

 
            await axios.post('http://localhost:8080/api/user/createWithPatient', user);


            setPatient({
                firstName: '',
                lastName: '',
                birthDate: '',
                roomNumber: ''
            });
            setUser({
                username: '',
                password: '',
                userType: 'Pacjent',
                patient: {}
            });

            alert('Pacjent i użytkownik dodani pomyślnie!');
            navigate('/');
        } catch (error) {
            console.error('Błąd podczas dodawania pacjenta lub użytkownika:', error);
            setError('Nie udało się dodać pacjenta lub użytkownika');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPatient(prevPatient => ({
            ...prevPatient,
            [name]: value
        }));
    };

    const handleUserChange = (e) => {
        const { name, value } = e.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };

    return (
        <div className="patient-form-container">
            <h1>Dodaj Pacjenta</h1>
            {error && <p>{error}</p>}

            <input
                type="text"
                name="firstName"
                placeholder="Imię Pacjenta"
                value={patient.firstName}
                onChange={handleChange}
            />

            <input
                type="text"
                name="lastName"
                placeholder="Nazwisko Pacjenta"
                value={patient.lastName}
                onChange={handleChange}
            />

            <input
                type="date"
                name="birthDate"
                placeholder="Data urodzenia"
                value={patient.birthDate}
                onChange={handleChange}
            />

            <input
                type="text"
                name="roomNumber"
                placeholder="Numer pokoju"
                value={patient.roomNumber}
                onChange={handleChange}
            />

            <h2>Informacje o Użytkowniku</h2>
            <input
                type="text"
                name="username"
                placeholder="Nazwa użytkownika"
                value={user.username}
                onChange={handleUserChange}
            />

            <input
                type="password"
                name="password"
                placeholder="Hasło"
                value={user.password}
                onChange={handleUserChange}
            />

            <button onClick={handleAddPatient}>Dodaj Pacjenta i Użytkownika</button>
        </div>
    );
}

export default withAuth(AddPatient, ['Admin']);
